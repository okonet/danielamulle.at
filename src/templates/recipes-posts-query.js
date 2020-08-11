import { graphql } from "gatsby"
export { default } from "../components/RecipesPage"

export const query = graphql`
  query RecipesQuery {
    allCategory(
      filter: { isTag: { eq: true }, collection: { eq: "recipes" } }
    ) {
      nodes {
        id
        slug
        postCount
      }
    }
    allPost(filter: { collection: { eq: "recipes" } }) {
      nodes {
        ...PostMeta
      }
    }
    localSearchRecipes {
      index
      store
    }
  }
`
