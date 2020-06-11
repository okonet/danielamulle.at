const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const crypto = require("crypto")
const Debug = require("debug")
const pkg = require("./package.json")
const { createFilePath } = require("gatsby-source-filesystem")
const withDefaults = require("./utils")

const debug = Debug(pkg.name)

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { contentPath, assetPath, recipesPath } = withDefaults(themeOptions)

  const dirs = [
    path.join(program.directory, recipesPath),
    path.join(program.directory, contentPath),
    path.join(program.directory, assetPath),
  ]

  dirs.forEach((dir) => {
    debug("Initializing ${dir} directory")
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

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
    type CategoriesJson implements Node {
      id: ID!
    }
    
    type MdxFrontmatter implements Node {
      title: String!
      date: Date! @dateformat
      coverImage: File
      timeToCook: Int
      categories: [CategoriesJson] @link(from: "categories.category")
      ingredients: [String]
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
// createResolvers({
//   MdxRecipe: {
//     categories: {
//       type: `[CategoriesJson]`,
//       resolve(source, args, context, info) {
//         const assignedCategories = source.frontmatter[info.fieldName]
//         console.log(assignedCategories)
//         if (!assignedCategories) {
//           return null
//         }
//
//         const ids = assignedCategories.map((cat) => cat.category)
//         return context.nodeModel.getNodesByIds({
//           ids,
//           type: `CategoriesJson`,
//         })
//       },
//     },
//   },
// })
// }

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { recipesPath, categoriesPath } = withDefaults()
  const { createNodeField, createNode, createParentChildLink } = actions

  if (node.internal.type === `CategoriesJson`) {
    const slug = createFilePath({ node, getNode, basePath: `categories` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node
    const parent = getNode(node.parent)
    switch (parent.sourceInstanceName) {
      case recipesPath: {
        const slug = createFilePath({ node, getNode, basePath: `` })
        const fieldData = {
          title: node.frontmatter.title,
          slug,
        }

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
            description: `Satisfies the interface for Mdx`,
          },
        })
        createParentChildLink({
          parent: parent,
          child: node,
        })
        break
      }
      default: {
      }
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
