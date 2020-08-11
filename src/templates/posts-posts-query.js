import { graphql } from "gatsby"
export { default } from "../components/BlogPostsPage"

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
