import { graphql } from "gatsby"
export { default } from "../components/RecipeCategoryPage"

export const query = graphql`
  query RecipesCategoryQuery($id: String!) {
    category(id: { eq: $id }) {
      id
      postCount
      posts {
        ...PostMeta
      }
    }
  }
`
