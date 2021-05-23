/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import dynamic from "next/dynamic"
import smartypants from "@silvenon/remark-smartypants"
import renderToString from "next-mdx-remote/render-to-string"
import {
  getAllPostsAndCategories,
  getCategoriesByCollection,
  getPostBySlug,
} from "../api/posts"
import config from "../../../site.config"
import components from "../../components/mdx-components"

const DefaultPage = dynamic(() => import("../../components/DefaultPage"))
const BlogPostPage = dynamic(() => import("../../components/BlogPostPage"))
const RecipePage = dynamic(() => import("../../components/RecipesPost"))
const ResourcePostPage = dynamic(() =>
  import("../../components/ResourcePostPage")
)
const ProjectsCategoryPage = dynamic(() =>
  import("../../components/ProjectsCategoryPage")
)

export async function getStaticProps({ params, locale }) {
  const { collection, slug } = params
  const pageType = slug[1] ?? "default"
  const post = getPostBySlug(collection, slug[0])
  const thanksPost = getPostBySlug("sections", "thanks")
  const collectionCategories = getCategoriesByCollection(collection)

  if (!post || !thanksPost) {
    console.error("Could not fetch post...")
  }

  let matchTagsWithCategory = (post, category) => {
    return post.categories.find((tag) => tag.id === category.id)
  }

  const tags = collectionCategories.filter((category) => {
    const matchedTag = matchTagsWithCategory(post, category)
    return matchedTag && category.isTag
  })

  const category =
    collectionCategories.find((category) => {
      const matchedTag = matchTagsWithCategory(post, category)
      return matchedTag && !category.isTag
    }) ?? null

  const contentSrc = pageType === "thanks" ? thanksPost.content : post.content

  const mdxSource = await renderToString(contentSrc, {
    components,
    mdxOptions: {
      remarkPlugins: [smartypants],
    },
  })

  return {
    props: {
      collection,
      post: {
        ...post,
        body: mdxSource,
        category,
        tags,
        date: new Intl.DateTimeFormat(locale, {
          dateStyle: "full",
        }).format(new Date(post.date)),
      },
      pageType,
    },
  }
}

export async function getStaticPaths() {
  const collectionsWithPosts = Object.values(config.collections)
    .filter((collection) => collection !== config.collections.projects)
    .flatMap((collection) => {
      const [allPosts] = getAllPostsAndCategories(collection)
      return allPosts.map((post) => {
        return {
          params: {
            collection,
            slug: [post.rawSlug],
          },
        }
      })
    })

  return {
    paths: collectionsWithPosts,
    fallback: true,
  }
}

function SinglePostPage(props) {
  switch (props.collection) {
    case "posts": {
      return <BlogPostPage {...props} />
    }
    case "projects": {
      return <ProjectsCategoryPage {...props} />
    }
    case "recipes": {
      return <RecipePage {...props} />
    }
    case "resources": {
      return <ResourcePostPage {...props} />
    }
    case "legal": {
      return <DefaultPage {...props} shouldShowSubscribe={false} />
    }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default SinglePostPage
