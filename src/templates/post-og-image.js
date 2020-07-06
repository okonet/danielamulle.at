import React from "react"
import RecipeCard from "../components/RecipeCard"

export default ({ slug, coverImage, title }) => {
  return <RecipeCard slug={slug} coverImage={coverImage} title={title} />
}
