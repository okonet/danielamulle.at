import React from "react"
import { getAllPostsAndCategories } from "../api/posts"
import BlogPosts from "../../components/BlogPosts"
import ProjectsPosts from "../../components/ProjectsPosts"
import RecipesPosts from "../../components/RecipesPosts"
import TestimonialsPosts from "../../components/TestimonialsPosts"
import config from "../../../site.config"
import { compareDesc } from "date-fns"

export async function getStaticProps({ params, locale }) {
  const { collection } = params
  const [posts, categories] = getAllPostsAndCategories(collection)

  // TODO: Should grouping happening here?

  return {
    props: {
      collection,
      posts: posts
        .map((post) => ({
          ...post,
          date: new Intl.DateTimeFormat(locale, {
            dateStyle: "long",
          }).format(new Date(post.date)),
        }))
        // Sort posts chronologically
        .sort((postLeft, postRight) => {
          return compareDesc(new Date(postLeft.date), new Date(postRight.date))
        }),
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
    case "recipes": {
      return <RecipesPosts {...props} />
    }
    case "projects":
    case "diatologischer-jahresstart-2021": {
      return <ProjectsPosts {...props} />
    }
    case "testimonials": {
      return <TestimonialsPosts {...props} />
    }
    case "resources": {
      return <TestimonialsPosts {...props} />
    }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default PostsPage
