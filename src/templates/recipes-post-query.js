import { graphql } from "gatsby"
export { default } from "../components/RecipePage"
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
