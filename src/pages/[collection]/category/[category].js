import React from "react"
import { getAllPostsAndCategories } from "../../api/posts"
import config from "../../../../site.config"
import BlogCategoryPage from "../../../components/BlogCategoryPage"
// import ProjectsCategoryPage from "../../../components/ProjectsCategoryPage"
import RecipeCategoryPage from "../../../components/RecipesCategory"
import slug from "slug"

export async function getStaticProps({ params }) {
  const { collection, category } = params
  const [_, categories] = getAllPostsAndCategories(collection)

  const categoryMatch = categories.find((cat) => slug(cat.id) === category)
  if (!categoryMatch) {
    return {
      notFound: true, // TODO: Remove in favor of fallback: true
    }
  }
  return {
    props: {
      collection,
      category: categoryMatch,
      posts: categoryMatch.posts,
      categories,
    },
  }
}

export async function getStaticPaths() {
  return {
    // get all categories for a collection
    paths: Object.values(config.collections).flatMap((collection) => {
      const [_, categories] = getAllPostsAndCategories(collection)
      return categories.map((category) => {
        return {
          params: { collection, category: slug(category.id) },
        }
      })
    }),
    fallback: false,
  }
}

function CategoryPage(props) {
  const { collection } = props
  switch (collection) {
    case "posts": {
      return <BlogCategoryPage {...props} />
    }
    // case "projects": {
    //   return <ProjectsCategoryPage {...props} />
    // }
    case "recipes": {
      return <RecipeCategoryPage {...props} />
    }
    default:
      return <h1>No page for this collection is defined</h1>
  }
}

export default CategoryPage
