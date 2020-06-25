import { graphql } from "gatsby"
import Posts from "../components/RecipesPage"

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
    category {
      id
      slug
    }
    categories {
      id
      slug
    }
  }
  query PostsQuery {
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
