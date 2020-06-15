import { graphql } from "gatsby"
import Posts from "../components/RecipePosts"

export default Posts

export const query = graphql`
  fragment RecipeMeta on MdxRecipe {
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
  query PostsQuery {
    allMdxRecipe(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      limit: 1000
    ) {
      nodes {
        ...RecipeMeta
      }
    }
  }
`
