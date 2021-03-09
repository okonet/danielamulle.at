import React from "react"
import { getAllPostsAndCategories } from "../api/posts"
import BlogPosts from "../../components/BlogPosts"
import ProjectsPosts from "../../components/ProjectsPosts"
import RecipesPosts from "../../components/RecipesPosts"
import TestimonialsPosts from "../../components/TestimonialsPosts"
import config from "../../../site.config"

export async function getStaticProps({ params }) {
  const { collection } = params
  const [posts, categories] = getAllPostsAndCategories(collection)

  // TODO: Should grouping happening here?

  return {
    props: {
      collection,
      posts,
      categories,
    },
  }
}

export async function getStaticPaths() {
  return {
    // get all collections
    paths: Object.values(config.collections).map((collection) => {
      return {
        params: { collection },
      }
    }),
    fallback: false,
  }
}

function PostsPage(props) {
  const { collection } = props
  switch (collection) {
    case "posts": {
      return <BlogPosts {...props} />
    }
    case "projects": {
      return <ProjectsPosts {...props} />
    }
    case "recipes": {
      return <RecipesPosts {...props} />
    }
    case "testimonials": {
      return <TestimonialsPosts {...props} />
    }
    // case "resources": {
    //   return <TestimonialsPosts {...props} />
    // }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default PostsPage
