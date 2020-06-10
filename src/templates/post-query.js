import { graphql } from "gatsby"
import PostPage from "../components/Post"

export default PostPage

export const query = graphql`
  query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
    mdxRecipe(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(locale: "de", formatString: "DD MMMM YYYY")
        timeToCook
        ingredients
        coverImage {
          absolutePath
          childImageSharp {
            fixed(width: 1024) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      body
    }
    previous: mdxRecipe(id: { eq: $previousId }) {
      id
      frontmatter {
        title
        date(locale: "de", formatString: "DD MMMM YYYY")
      }
    }
    next: mdxRecipe(id: { eq: $nextId }) {
      id
      frontmatter {
        title
        date(locale: "de", formatString: "DD MMMM YYYY")
      }
    }
  }
`
//
// export const query = graphql`
//   query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
//     site {
//       siteMetadata {
//         title
//         social {
//           name
//           url
//         }
//       }
//     }
//     blogPost(id: { eq: $id }) {
//       id
//       excerpt
//       body
//       slug
//       title
//       tags
//       keywords
//       date(formatString: "MMMM DD, YYYY")
//     }
//     previous: blogPost(id: { eq: $previousId }) {
//       id
//       excerpt
//       slug
//       title
//       date(formatString: "MMMM DD, YYYY")
//     }
//     next: blogPost(id: { eq: $nextId }) {
//       id
//       excerpt
//       slug
//       title
//       date(formatString: "MMMM DD, YYYY")
//     }
//   }
// `;
