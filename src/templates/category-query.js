import { graphql } from "gatsby"
import CategoryPage from "../components/CategoryPage"

export default CategoryPage

export const query = graphql`
  query CategoryQuery($id: String!) {
    categoriesJson(id: { eq: $id }) {
      id
      recipes {
        ...RecipeMeta
      }
    }
  }
`
