import React from "react"
import { getAllPosts } from "../api/posts"
import BlogPosts from "../../components/BlogPosts"
import ProjectsPosts from "../../components/ProjectsPosts"
import RecipesPosts from "../../components/RecipesPosts"

export async function getStaticProps({ params }) {
  const { collection } = params
  const posts = getAllPosts(collection)

  return {
    props: {
      collection,
      posts,
    },
  }
}

export async function getStaticPaths() {
  // get all collections
  const collections = [
    "posts",
    "recipes",
    "projects",
    "testimonials",
    "resources",
  ]

  return {
    paths: collections.map((collection) => {
      return {
        params: { collection },
      }
    }),
    fallback: false,
  }
}

function RecipesIndex({ collection, ...props }) {
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
    // case "testimonials": {
    //   return <TestimonialsPosts {...props} />
    // }
    // case "resources": {
    //   return <TestimonialsPosts {...props} />
    // }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default RecipesIndex
