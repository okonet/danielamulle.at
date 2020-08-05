import { graphql } from "gatsby"
import RecipePage from "../components/RecipePage"

export default RecipePage

export const query = graphql`
  query RecipeQuery($id: String!) {
    post(id: { eq: $id }) {
      title
      body
      timeToCook
      coverImage {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      categories {
        id
        slug
      }
    }
  }
`
