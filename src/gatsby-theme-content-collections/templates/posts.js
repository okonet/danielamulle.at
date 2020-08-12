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
      }
    }
    recipes: allPost(filter: { collection: { eq: "recipes" } }) {
      nodes {
        ...PostMeta
      }
    }
    testimonials: allPost(filter: { collection: { eq: "testimonials" } }) {
      nodes {
        ...PostMeta
      }
    }
    allCategory(
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
