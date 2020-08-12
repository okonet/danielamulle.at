import { graphql } from "gatsby"
import BlogPostsPage from "../components/BlogPostsPage"
export default BlogPostsPage
export const query = graphql`
  query BlogPostsQuery {
    allPost(
      filter: { collection: { eq: "posts" } }
      sort: { fields: [date, title], order: [DESC, ASC] }
    ) {
      nodes {
        ...PostMeta
      }
    }
  }
`
