/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import {
  getAllPostsAndCategories,
  getCategoriesByCollection,
  getPostBySlug,
} from "../api/posts"
import components from "../../gatsby-plugin-theme-ui/components"
import config from "../../../site.config"
import BlogPostPage from "../../components/BlogPostPage"
import RecipePage from "../../components/RecipesPost"
import ResourcePostPage from "../../components/ResourcePostPage"
import ProjectsCategoryPage from "../../components/ProjectsCategoryPage"

export async function getStaticProps({ params, locale }) {
  const { collection, slug } = params
  const pageType = slug[1] ?? "default"
  const post = getPostBySlug(collection, slug[0])
  const collectionCategories = getCategoriesByCollection(collection)

  if (!post) {
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

  const mdxSource = await renderToString(post.content, { components })
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
  const collectionsWithPosts = Object.values(config.collections).flatMap(
    (collection) => {
      const [allPosts] = getAllPostsAndCategories(collection)
      return allPosts.map((post) => {
        return {
          params: {
            collection,
            slug: [post.rawSlug],
          },
        }
      })
    }
  )

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
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default SinglePostPage
