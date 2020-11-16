import { graphql } from "gatsby"
import CategoryPage from "../components/CategoryPage"
export default CategoryPage
export const query = graphql`
  query MyCategoryQuery($id: String!) {
    category(id: { eq: $id }) {
      id
      postCount
      posts {
        ...PostMeta
      }
      coverImage {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      coverImageAuthor
      coverImageLink
      startDate
      endDate
      description
      isPublished
    }
    projectPosts: allPost(
      filter: {
        collection: { eq: "projects" }
        categories: { elemMatch: { id: { eq: $id } } }
      }
      sort: { fields: [date, title], order: [DESC, ASC] }
    ) {
      nodes {
        ...PostMeta
        date
        coverImageAuthor
      }
    }
  }
`
