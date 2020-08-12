import { graphql } from "gatsby"
import BlogPostPage from "../components/BlogPostPage"

export default BlogPostPage

export const query = graphql`
  query BlogPostQuery($id: String!) {
    post(id: { eq: $id }) {
      ...PostContent
      ...Categories
    }
  }
`
