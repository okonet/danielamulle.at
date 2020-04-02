import { graphql } from "gatsby";
import PostPage from "../components/Post";

export default PostPage;

export const query = graphql`
    query PostPageQuery($id: String!, $previousId: String, $nextId: String) {
        mdx(id: { eq: $id }) {
            id
            excerpt
            frontmatter {
                title
                date(locale: "de", formatString: "DD MMMM YYYY")
            }
            body
        }
        previous: mdx(id: { eq: $previousId }) {
            id
            excerpt
            frontmatter {
                title
                date(locale: "de", formatString: "DD MMMM YYYY")
            }
        }
        next: mdx(id: { eq: $nextId }) {
            id
            excerpt
            frontmatter {
                title
                date(locale: "de", formatString: "DD MMMM YYYY")
            }
        }
    }
`;
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
