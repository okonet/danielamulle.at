import { graphql } from "gatsby"
import RecipeCategoryPage from "../components/RecipeCategoryPage"

export default RecipeCategoryPage

export const query = graphql`
  query CategoryQuery($id: String!) {
    category(id: { eq: $id }) {
      id
      postCount
      posts {
        ...PostMeta
      }
    }
  }
`
