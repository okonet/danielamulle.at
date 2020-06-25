const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const crypto = require("crypto")
const Debug = require("debug")
const slug = require("slug")
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
    type Category implements Node {
      id: ID!
      slug: String!
      recipes: [Recipe]!
      recipeCount: Int!,
      isTag: Boolean
    }
    
    type Recipe implements Node {
      id: ID!
      date: Date @dateformat
      slug: String
      title: String
      body: String
      coverImage: File
      ingredients: [String]
      category: [Category] @link(from: "category.value")
      categories: [Category] @link(from: "tags.value")
      timeToCook: String
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers, schema }) => {
  createResolvers({
    Recipe: {
      body: {
        type: "String",
        resolve: mdxResolverPassthrough("body"),
      },
    },
    Category: {
      recipes: {
        type: "[Recipe]",
        async resolve(source, args, context, info) {
          const res = await context.nodeModel.runQuery({
            query: {
              filter: {
                [source.isTag ? "categories" : "category"]: {
                  elemMatch: { id: { eq: source.id } },
                },
              },
              sort: { fields: ["title"], order: ["ASC"] },
            },
            type: "Recipe",
            firstOnly: false,
          })
          if (res === null) {
            return []
          }
          return res
        },
      },
      recipeCount: {
        type: "Int!",
        async resolve(source, args, context, info) {
          const res = await context.nodeModel.runQuery({
            query: {
              filter: {
                [source.isTag ? "categories" : "category"]: {
                  elemMatch: { id: { eq: source.id } },
                },
              },
            },
            type: "Recipe",
            firstOnly: false,
          })
          if (res === null) {
            return 0
          }
          return res.length
        },
      },
    },
  })
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions
  if (node.internal.type === `ContentJson`) {
    ;["categories", "tags"].forEach((key) => {
      if (node[key] == null) {
        return
      }
      node[key].forEach((obj) => {
        const jsonNode = {
          ...obj,
          slug: `/${categoriesPath}/${slug(obj.id)}`,
          isTag: key === "tags",
          children: [],
          parent: node.id,
          internal: {
            contentDigest: createContentDigest(obj),
            type: "Category",
          },
        }
        createNode(jsonNode)
        createParentChildLink({ parent: node, child: jsonNode })
      })
    })
  }
  if (node.internal.type === "Mdx") {
    const { frontmatter } = node
    const parent = getNode(node.parent)
    switch (parent.sourceInstanceName) {
      case recipesPath: {
        const slug = createFilePath({ node, getNode, basePath })
        const fieldData = {
          ...frontmatter,
          slug: `/${recipesPath}${slug}`,
        }

        createNode({
          ...fieldData,
          // Required fields.
          id: createNodeId(`${node.id} >>> Recipe`),
          parent: node.id,
          children: [],
          internal: {
            type: "Recipe",
            contentDigest: crypto
              .createHash("md5")
              .update(JSON.stringify(fieldData))
              .digest("hex"),
            content: JSON.stringify(fieldData),
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
const RecipeTemplate = require.resolve("./src/templates/recipe-query")
const RecipesTemplate = require.resolve("./src/templates/recipes-query")
const CategoryTemplate = require.resolve("./src/templates/category-query")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allRecipe(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
      allCategory {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create Posts and Post pages.
  const { allRecipe, allCategory } = result.data
  const categories = allCategory.nodes
  const posts = allRecipe.edges

  // Create a page for each Post
  posts.forEach(({ node: post }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    createPage({
      path: post.slug,
      component: RecipeTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  categories.forEach(({ id, slug }) => {
    createPage({
      path: slug,
      component: CategoryTemplate,
      context: {
        id,
      },
    })
  })

  // Create the Recipes page
  createPage({
    path: recipesPath,
    component: RecipesTemplate,
    context: {},
  })
}
