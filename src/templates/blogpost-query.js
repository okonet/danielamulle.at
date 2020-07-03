import { graphql } from "gatsby"
import BlogPostPage from "../components/BlogPostPage"

export default BlogPostPage

export const query = graphql`
  query BlogPostQuery($id: String!, $previousId: String, $nextId: String) {
    blogPost(id: { eq: $id }) {
      date(locale: "de", formatString: "DD MMMM YYYY")
      title
      body
      coverImage {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      categories {
        id
        slug
      }
    }
    previous: blogPost(id: { eq: $previousId }) {
      id
      title
      date(locale: "de", formatString: "DD MMMM YYYY")
    }
    next: blogPost(id: { eq: $nextId }) {
      id
      title
      date(locale: "de", formatString: "DD MMMM YYYY")
    }
  }
`
