import React from "react"
import BlogPostPage from "../../components/BlogPostPage"
import RecipePage from "../../components/RecipesPost"
import TestimonialsPost from "../../components/TestimonialsPost"
import ProjectsPostPage from "../../components/ProjectsPostPage"
import ResourcePostPage from "../../components/ResourcePostPage"

function PostPage(props) {
  switch (props.collection) {
    case "posts": {
      return <BlogPostPage {...props} />
    }
    case "projects": {
      return <ProjectsPostPage {...props} />
    }
    case "recipes": {
      return <RecipePage {...props} />
    }
    case "testimonials": {
      return <TestimonialsPost {...props} />
    }
    case "resources": {
      return <ResourcePostPage {...props} />
    }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default PostPage
