import { graphql } from "gatsby"
import BlogPostPage from "../components/BlogPostPage"

export default BlogPostPage

export const query = graphql`
  fragment PostContent on Post {
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
    coverImageAuthor
    coverImageLink
  }
  query BlogPostQuery($id: String!) {
    post(id: { eq: $id }) {
      ...PostContent
      ...Categories
    }
  }
`
