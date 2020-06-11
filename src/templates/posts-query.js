import { graphql } from "gatsby"
import Posts from "../components/Posts"

export default Posts

export const query = graphql`
  query PostsQuery {
    allMdxRecipe(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      limit: 1000
    ) {
      nodes {
        id
        slug
        frontmatter {
          date(locale: "de", formatString: "DD MMMM YYYY")
          title
          coverImage {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          categories {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  }
`
