import { graphql } from "gatsby"
import Posts from "../components/Recipes"

export default Posts

export const query = graphql`
  fragment RecipeMeta on Recipe {
    id
    slug
    date(locale: "de", formatString: "DD MMMM YYYY")
    title
    coverImage {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_tracedSVG
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
  query PostsQuery {
    allRecipe(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      nodes {
        ...RecipeMeta
      }
    }
  }
`
