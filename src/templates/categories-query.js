import { graphql } from "gatsby"
import Posts from "../components/RecipePosts"

export default Posts

export const query = graphql`
  query CategoriesQuery {
    allCategoriesJson {
      nodes {
        id
        fields {
          slug
        }
      }
    }
  }
`
