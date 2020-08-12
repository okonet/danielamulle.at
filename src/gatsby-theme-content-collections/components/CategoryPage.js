import React from "react"
import BlogCategoryPage from "../../components/BlogCategoryPage"
import RecipeCategoryPage from "../../components/RecipesCategory"

function PostPage(props) {
  switch (props.pageContext.collection) {
    case "posts": {
      return <BlogCategoryPage {...props} />
    }
    case "recipes": {
      return <RecipeCategoryPage {...props} />
    }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default PostPage
