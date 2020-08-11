import { graphql } from "gatsby"
export { default } from "../components/BlogCategoryPage"

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
