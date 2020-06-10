// const fs = require("fs");
// const path = require("path");
// const mkdirp = require("mkdirp");
const crypto = require("crypto")
const Debug = require("debug")
const { createFilePath } = require("gatsby-source-filesystem")
// const { urlResolve, createContentDigest } = require("gatsby-core-utils");
const withDefaults = require("./utils")
//
const debug = Debug(`my-blog`)

const mdxResolverPassthrough = (fieldName) => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType("Mdx")
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = `
    interface Category @nodeInterface {
      id: ID!
      title: String!
      slug: String!
    }
    
    type MdxFrontmatter implements Node {
      title: String!
      categories: [Category]
    }
    
    interface Post @nodeInterface {
      id: ID!
      title: String
      body: String!
      slug: String!
      frontmatter: MdxFrontmatter!
    }
  `
  createTypes(typeDefs)

  createTypes(
    schema.buildObjectType({
      name: `MdxRecipe`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: "String!",
        },
        slug: {
          type: "String!",
        },
        frontmatter: {
          type: "MdxFrontmatter!",
        },
        body: {
          type: "String!",
          resolve: mdxResolverPassthrough("body"),
        },
      },
      interfaces: [`Node`, `Post`],
    })
  )
}

// exports.createResolvers = ({ createResolvers, schema }) => {
//   createResolvers({
//     Recipe: {
//       categories: {
//         //     type: `[Category]`,
//         async resolve(source, args, context, info) {
//           const availableCategories = source[info.fieldName]
//           if (!availableCategories) return null
//           const categories = availableCategories.map((cat) => cat.category)
//           console.log(categories)
//           const nodes = await context.nodeModel.runQuery({
//             query: {
//               filter: { fileAbsolutePath: { regex: "/recipeCategories/" } },
//             },
//             type: "Mdx",
//           })
//           // return null
//           return nodes.filter((node) =>
//             categories.includes(node.frontmatter.title)
//           )
//         },
//       },
//     },
//     Category: {
//       title: {
//         async resolve(source, args, context, info) {
//           const node = await context.nodeModel.getNodeById({
//             id: source.id,
//           })
//           return node.frontmatter.title
//         },
//       },
//       slug: {
//         async resolve(source, args, context, info) {
//           const node = await context.nodeModel.getNodeById({
//             id: source.id,
//           })
//           return node.fields.slug
//         },
//       },
//     },
//     // Query: {
//     //   allCategories: {
//     //     type: `[Category!]!`,
//     //     async resolve(source, args, context, info) {
//     //       const nodes = await context.nodeModel.runQuery({
//     //         query: {
//     //           filter: { fileAbsolutePath: { regex: "/recipeCategories/" } },
//     //         },
//     //         type: "Mdx",
//     //       })
//     //       const categories = nodes.map((mdx) => ({
//     //         id: mdx.id,
//     //         title: mdx.frontmatter.title,
//     //         slug: mdx.fields.slug,
//     //       }))
//     //       return categories
//     //     },
//     //   },
//     // },
//   })
// }

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

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode, createParentChildLink } = actions

  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node
    const parent = getNode(node.parent)

    if (parent.sourceInstanceName === "content/posts") {
      const slug = createFilePath({ node, getNode, basePath: `` })
      const fieldData = {
        title: node.frontmatter.title,
        slug,
      }

      console.log(fieldData)

      createNode({
        ...fieldData,
        frontmatter,
        // Required fields.
        id: createNodeId(`${node.id} >>> MdxRecipe`),
        parent: node.id,
        children: [],
        internal: {
          type: `MdxRecipe`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(fieldData))
            .digest(`hex`),
          content: JSON.stringify(fieldData),
          description: `Satisfies the MdxRecipe interface for Mdx`,
        },
      })
      createParentChildLink({
        parent: parent,
        child: node,
      })
    }
  }
}

// These templates are simply data-fetching wrappers that import components
const PostTemplate = require.resolve("./src/templates/post-query")
const PostsTemplate = require.resolve("./src/templates/posts-query")

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  const { basePath } = withDefaults(themeOptions)

  const result = await graphql(`
    {
      allMdxRecipe(
        sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
        limit: 1000
      ) {
        edges {
          previous {
            id
          }
          next {
            id
          }
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create Posts and Post pages.
  const { allMdxRecipe } = result.data
  const posts = allMdxRecipe.edges

  // Create a page for each Post
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    createPage({
      path: post.slug,
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  // // Create the Posts page
  createPage({
    path: basePath,
    component: PostsTemplate,
    context: {},
  })
}
