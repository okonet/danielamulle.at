import React from "react"
import BlogPostPage from "../../components/BlogPostPage"
import RecipePage from "../../components/RecipesPost"
import TestimonialsPost from "../../components/TestimonialsPost"

function PostPage(props) {
  switch (props.pageContext.collection) {
    case "posts": {
      return <BlogPostPage {...props} />
    }
    case "recipes": {
      return <RecipePage {...props} />
    }
    case "testimonials": {
      return <TestimonialsPost {...props} />
    }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default PostPage
