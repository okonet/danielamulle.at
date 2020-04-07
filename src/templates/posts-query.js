import { graphql } from "gatsby"
import Posts from "../components/Posts"

export default Posts

export const query = graphql`
  query PostsQuery {
    allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(locale: "de", formatString: "DD MMMM YYYY")
            description
            title
            coverImage {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
