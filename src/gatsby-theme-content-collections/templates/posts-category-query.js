import { graphql } from "gatsby"
import BlogCategoryPage from "../components/BlogCategoryPage"
export default BlogCategoryPage
export const query = graphql`
  query PostsCategoryQuery($id: String!) {
    category(id: { eq: $id }) {
      id
      postCount
      posts {
        ...PostMeta
      }
    }
  }
`
