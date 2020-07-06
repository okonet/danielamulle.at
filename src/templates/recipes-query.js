import { graphql } from "gatsby"
import RecipesPage from "../components/RecipesPage"

export default RecipesPage

export const query = graphql`
  fragment RecipeMeta on Recipe {
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
    category {
      id
      slug
    }
    categories {
      id
      slug
    }
  }
  query RecipesQuery {
    allCategory(filter: { isTag: { eq: true } }) {
      nodes {
        id
        slug
        recipeCount
      }
    }
    allRecipe {
      nodes {
        ...RecipeMeta
      }
    }
    localSearchRecipes {
      index
      store
    }
  }
`
