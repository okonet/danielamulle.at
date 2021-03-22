import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import { getAllPostsAndCategories } from "../api/posts"
import BlogPosts from "../../components/BlogPosts"
import RecipesPosts from "../../components/RecipesPosts"
import config from "../../../site.config"
import components from "../../gatsby-plugin-theme-ui/components"
import DefaultPage from "../../components/DefaultPage"
import { getSection } from "../api/sections"
import ProjectsPosts from "../../components/ProjectsPosts"

export async function getStaticProps({ params, locale }) {
  const { collection } = params
  const [posts, categories] = getAllPostsAndCategories(collection)

  // Get section and parse section content as MDX
  let section = getSection(collection)
  const { content } = section
  if (content) {
    const sectionMDX = await renderToString(content, { components })
    section = {
      ...section,
      body: sectionMDX,
    }
  }

  // TODO: Should grouping happening here?

  return {
    props: {
      section,
      collection,
      posts: posts.map((post) => ({
        ...post,
        date: new Intl.DateTimeFormat(locale, {
          dateStyle: "long",
        }).format(new Date(post.date)),
      })),
      categories,
    },
  }
}

export async function getStaticPaths() {
  return {
    // get all collections
    paths: Object.values(config.collections)
      // We have a separate index.js for recipes
      .filter((collection) => collection !== config.collections.recipes)
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
