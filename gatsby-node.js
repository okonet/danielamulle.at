const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const crypto = require("crypto")
const Debug = require("debug")
const pkg = require("./package.json")
const { createFilePath } = require("gatsby-source-filesystem")
const {
  basePath,
  contentPath,
  recipesPath,
  categoriesPath,
  assetPath,
} = require("./paths")

const debug = Debug(pkg.name)

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }) => {
  const { program } = store.getState()
  const dirs = [
    path.join(program.directory, basePath, recipesPath),
    path.join(program.directory, basePath, contentPath),
    path.join(program.directory, basePath, assetPath),
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
      recipes: [MdxRecipe]
    }
    
    type MdxRecipe implements Node {
      id: ID!
      date: Date @dateformat
      slug: String
      title: String
      body: String
      coverImage: File
      ingredients: [String]
      categories: [CategoriesJson] @link(from: "categories.category")
      timeToCook: Int
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers, schema }) => {
  createResolvers({
    MdxRecipe: {
      body: {
        type: "String",
        resolve: mdxResolverPassthrough("body"),
      },
    },
    CategoriesJson: {
      recipes: {
        type: "[MdxRecipe]",
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                categories: { elemMatch: { id: { eq: source.id } } },
              },
            },
            type: `MdxRecipe`,
            firstOnly: false,
          })
        },
      },
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode, createParentChildLink } = actions

  if (node.internal.type === `CategoriesJson`) {
    const slug = createFilePath({ node, getNode, basePath })
    createNodeField({
      node,
      name: `slug`,
      value: `${categoriesPath}${slug}`,
    })
  }

  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node
    const parent = getNode(node.parent)
    switch (parent.sourceInstanceName) {
      case recipesPath: {
        const slug = createFilePath({ node, getNode, basePath })
        const fieldData = {
          ...frontmatter,
          slug: `${recipesPath}${slug}`,
        }

        createNode({
          ...fieldData,
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
const RecipePostTemplate = require.resolve("./src/templates/post-query")
const RecipePostsTemplate = require.resolve("./src/templates/posts-query")
const CategoryTemplate = require.resolve("./src/templates/category-query")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdxRecipe(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
      allCategoriesJson(sort: { fields: [id], order: DESC }) {
        nodes {
          id
          fields {
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
  const { allMdxRecipe, allCategoriesJson } = result.data
  const categories = allCategoriesJson.nodes
  const posts = allMdxRecipe.edges

  // Create a page for each Post
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    createPage({
      path: post.slug,
      component: RecipePostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  categories.forEach(({ id, fields }) => {
    createPage({
      path: fields.slug,
      component: CategoryTemplate,
      context: {
        id,
      },
    })
  })

  // Create the Recipes page
  createPage({
    path: recipesPath,
    component: RecipePostsTemplate,
    context: {},
  })
}
