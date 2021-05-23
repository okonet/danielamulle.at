import React from "react"
import dynamic from "next/dynamic"
import renderToString from "next-mdx-remote/render-to-string"
import smartypants from "@silvenon/remark-smartypants"
import { getAllPostsAndCategories } from "../api/posts"
import config from "../../../site.config"
import components from "../../components/mdx-components"
import { getSection } from "../api/sections"

const DefaultPage = dynamic(() => import("../../components/DefaultPage"))
const BlogPosts = dynamic(() => import("../../components/BlogPosts"))
const RecipesPosts = dynamic(() => import("../../components/RecipesPosts"))
const ProjectsPosts = dynamic(() => import("../../components/ProjectsPosts"))

export async function getStaticProps({ params, locale }) {
  const { collection } = params
  const [posts, categories] = getAllPostsAndCategories(collection)

  // Get section and parse section content as MDX
  let post = getSection(collection)
  const { content } = post
  if (content) {
    const sectionMDX = await renderToString(content, {
      components,
      mdxOptions: {
        remarkPlugins: [smartypants],
      },
    })
    post = {
      ...post,
      body: sectionMDX,
    }
  }

  // TODO: Should grouping happening here?

  return {
    props: {
      categories,
      collection,
      post,
      posts: posts.map((post) => ({
        ...post,
        date: new Intl.DateTimeFormat(locale, {
          dateStyle: "long",
        }).format(new Date(post.date)),
      })),
    },
  }
}

export async function getStaticPaths() {
  return {
    // get all collections
    paths: Object.values(config.collections)
      // We have a separate index.js for recipes
      .filter(
        (collection) =>
          collection !== config.collections.recipes &&
          collection !== config.collections.resources
      )
      .map((collection) => {
        return {
          params: { collection },
        }
      }),
    fallback: false,
  }
}

export default function CollectionIndexPage(props) {
  const { collection } = props
  switch (collection) {
    case "posts": {
      return <BlogPosts {...props} />
    }
    case "recipes": {
      return <RecipesPosts {...props} />
    }
    case "projects": {
      return <ProjectsPosts {...props} />
    }
    default: {
      // Render default page with a single page
      return <DefaultPage {...props} />
    }
  }
}
