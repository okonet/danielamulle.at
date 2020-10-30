import React from "react"
import BlogPosts from "../../components/BlogPosts"
import RecipesPosts from "../../components/RecipesPosts"
import TestimonialsPosts from "../../components/TestimonialsPosts"
import ProjectsPosts from "../../components/ProjectsPosts"

function PostsPage(props) {
  switch (props.pageContext.collection) {
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
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default PostsPage
