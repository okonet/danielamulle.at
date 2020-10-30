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
    projects: allCategory(filter: { collection: { eq: "projects" } }) {
      nodes {
        id
        slug
        postCount
      }
    }
    projectsPosts: allPost(
      filter: { collection: { eq: "projects" } }
      sort: { fields: [date, title], order: [DESC, ASC] }
    ) {
      nodes {
        ...PostMeta
      }
    }
    testimonials: allPost(filter: { collection: { eq: "testimonials" } }) {
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
