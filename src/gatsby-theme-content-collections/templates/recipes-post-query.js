import { graphql } from "gatsby"
import RecipePage from "../components/RecipePage"
export default RecipePage
export const query = graphql`
  query RecipeQuery($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    post(id: { eq: $id }) {
      timeToCook
      ...PostContent
      ...Categories
    }
  }
`
