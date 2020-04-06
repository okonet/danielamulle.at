// const fs = require("fs");
// const path = require("path");
// const mkdirp = require("mkdirp");
// const Debug = require("debug");
const { createFilePath } = require("gatsby-source-filesystem");
// const { urlResolve, createContentDigest } = require("gatsby-core-utils");
const withDefaults = require("./utils");
//
// const debug = Debug(`my-blog`);
//
// // Ensure that content directories exist at site-level
// exports.onPreBootstrap = ({ store }, themeOptions) => {
//   const { program } = store.getState();
//   const { contentPath, assetPath } = withDefaults(themeOptions);
//
//   const dirs = [
//     path.join(program.directory, contentPath),
//     path.join(program.directory, assetPath),
//   ];
//
//   dirs.forEach((dir) => {
//     debug("Initializing ${dir} directory");
//     if (!fs.existsSync(dir)) {
//       mkdirp.sync(dir);
//     }
//   });
// };
//
// const mdxResolverPassthrough = (fieldName) => async (
//   source,
//   args,
//   context,
//   info
// ) => {
//   const type = info.schema.getType("Mdx");
//   const mdxNode = context.nodeModel.getNodeById({
//     id: source.parent,
//   });
//   const resolver = type.getFields()[fieldName].resolve;
//   const result = await resolver(mdxNode, args, context, {
//     fieldName,
//   });
//   return result;
// };
//
// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions;
//   createTypes(`interface BlogPost @nodeInterface {
//       id: ID!
//       title: String!
//       body: String!
//       slug: String!
//       date: Date! @dateformat
//       tags: [String]!
//       keywords: [String]!
//       excerpt: String!
//   }`);
//
//   createTypes(
//     schema.buildObjectType({
//       name: "MdxBlogPost",
//       fields: {
//         id: { type: "ID!" },
//         title: {
//           type: "String!",
//         },
//         slug: {
//           type: "String!",
//         },
//         date: { type: "Date!", extensions: { dateformat: {} } },
//         tags: { type: "[String]!" },
//         keywords: { type: "[String]!" },
//         excerpt: {
//           type: "String!",
//           args: {
//             pruneLength: {
//               type: "Int",
//               defaultValue: 140,
//             },
//           },
//           resolve: mdxResolverPassthrough("excerpt"),
//         },
//         body: {
//           type: "String!",
//           resolve: mdxResolverPassthrough("body"),
//         },
//       },
//       interfaces: ["Node", "BlogPost"],
//     })
//   );
// };
//

// Create fields for post slugs and source
// This will change with schema customization with work
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
//
// These templates are simply data-fetching wrappers that import components
const PostTemplate = require.resolve("./src/templates/post-query");
const PostsTemplate = require.resolve("./src/templates/posts-query");

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions;
  const { basePath } = withDefaults(themeOptions);

  const result = await graphql(`
    {
      allMdx(
        sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // Create Posts and Post pages.
  const { allMdx } = result.data;
  const posts = allMdx.edges;

  // Create a page for each Post
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];
    const { slug } = post.fields;
    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    });
  });

  // // Create the Posts page
  createPage({
    path: basePath,
    component: PostsTemplate,
    context: {},
  });
};
