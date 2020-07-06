import { graphql } from "gatsby"
import BlogPosts from "../components/BlogPostsPage"

export default BlogPosts

export const query = graphql`
  fragment BlogPostMeta on BlogPost {
    id
    slug
    date(locale: "de", formatString: "DD MMMM YYYY")
    title
    coverImage {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    categories {
      id
      slug
    }
  }
  query BlogPostsQuery {
    allBlogPost {
      nodes {
        ...BlogPostMeta
      }
    }
  }
`
