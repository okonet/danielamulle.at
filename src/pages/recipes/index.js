import React from "react"
import { getAllPostsAndCategories } from "../api/posts"
import RecipesPosts from "../../components/RecipesPosts"
import FlexSearch from "flexsearch"
import { keyBy } from "lodash"

export async function getStaticProps() {
  const collection = "recipes"
  const [recipes, categories] = getAllPostsAndCategories(collection)
  const searchDoc = {
    id: "id",
    field: "title",
    store: ["id", "title"],
  }
  const index = FlexSearch.create({ doc: searchDoc })
  index.add(recipes)
  // TODO: Should grouping happening here?

  return {
    props: {
      collection,
      posts: recipes,
      categories,
      searchIndex: index.export(),
      searchDoc,
      // searchStore: JSON.stringify(store),
    },
  }
}

export default function RecipesPage(props) {
  return <RecipesPosts {...props} />
}
