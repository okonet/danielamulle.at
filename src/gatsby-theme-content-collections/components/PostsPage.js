import React from "react"
import BlogPostPage from "../../components/BlogPostPage"
import RecipePage from "../../components/RecipePage"
import BlogCategoryPage from "../../components/BlogCategoryPage"
import RecipeCategoryPage from "../../components/RecipeCategoryPage"
import BlogPostsPage from "../../components/BlogPostsPage"
import RecipesList from "../../components/RecipesList"
import RecipesPage from "../../components/RecipesPage"

function PostPage(props) {
  switch (props.pageContext.collection) {
    case "posts": {
      return <BlogPostsPage {...props} />
    }
    case "recipes": {
      return <RecipesPage {...props} />
    }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default PostPage
