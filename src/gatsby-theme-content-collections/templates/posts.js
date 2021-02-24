import { graphql } from "gatsby"
import PostsPage from "../components/PostsPage"
export default PostsPage
export const query = graphql`
  query MyPostsQuery {
    posts: allPost(
      filter: { collection: { eq: "posts" } }
      sort: { fields: [date, title], order: [DESC, ASC] }
    ) {
      nodes {
        ...PostMeta
        date(locale: "de", formatString: "DD MMMM YYYY")
      }
    }
    recipes: allPost(filter: { collection: { eq: "recipes" } }) {
      nodes {
        ...PostMeta
      }
    }
    projects: allCategory(
      filter: { collection: { eq: "projects" }, isPublished: { eq: true } }
    ) {
      nodes {
        id
        slug
        postCount
        coverImage {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
    testimonials: allPost(filter: { collection: { eq: "testimonials" } }) {
      nodes {
        ...PostMeta
      }
    }
    resources: allPost(filter: { collection: { eq: "resources" } }) {
      nodes {
        ...PostMeta
      }
    }
    recipesCategories: allCategory(
      filter: { isTag: { eq: true }, collection: { eq: "recipes" } }
    ) {
      nodes {
        id
        slug
        postCount
      }
    }
    localSearchRecipes {
      index
      store
    }
  }
`
