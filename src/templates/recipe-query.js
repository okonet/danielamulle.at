import { graphql } from "gatsby"
import PostPage from "../components/RecipePage"

export default PostPage

export const query = graphql`
  query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
    recipe(id: { eq: $id }) {
      id
      title
      date(locale: "de", formatString: "DD MMMM YYYY")
      timeToCook
      ingredients
      coverImage {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      category {
        id
        slug
      }
      categories {
        id
        slug
      }
      body
    }
    previous: recipe(id: { eq: $previousId }) {
      id
      title
      date(locale: "de", formatString: "DD MMMM YYYY")
    }
    next: recipe(id: { eq: $nextId }) {
      id
      title
      date(locale: "de", formatString: "DD MMMM YYYY")
    }
  }
`
