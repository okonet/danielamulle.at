import { graphql } from "gatsby"
import BlogPosts from "../components/BlogPostsPage"

export default BlogPosts

export const query = graphql`
  query BlogPostsQuery {
    allPost(filter: { collection: { eq: "posts" } }) {
      nodes {
        ...PostMeta
      }
    }
  }
`
