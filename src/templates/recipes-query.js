import { graphql } from "gatsby"
import RecipesPage from "../components/RecipesPage"

export default RecipesPage

export const query = graphql`
  fragment PostMeta on Post {
    id ## Required for search to work
    slug
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
      slug
    }
  }
  query RecipesQuery {
    allCategory(
      filter: { isTag: { eq: true }, collection: { eq: "recipes" } }
    ) {
      nodes {
        id
        slug
        postCount
      }
    }
    allPost(filter: { collection: { eq: "recipes" } }) {
      nodes {
        ...PostMeta
      }
    }
    localSearchRecipes {
      index
      store
    }
  }
`
