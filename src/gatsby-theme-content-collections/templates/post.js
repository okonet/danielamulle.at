import { graphql } from "gatsby"
import PostPage from "../components/PostPage"
export default PostPage
export const query = graphql`
  query MyPostQuery($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    post(id: { eq: $id }) {
      timeToCook
      ...PostContent
      ...Categories
    }
  }
`
