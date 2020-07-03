const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")
const crypto = require("crypto")
const Debug = require("debug")
const slug = require("slug")
const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")
const pkg = require("./package.json")
const { createFilePath } = require("gatsby-source-filesystem")
const {
  basePath,
  blogPath,
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
    path.join(program.directory, basePath, blogPath),
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
    
    interface Post @nodeInterface {
      id: ID!
      body: String
      categories: [Category]
      coverImage: File
      date: Date
      slug: String
      title: String
    }
    
    type BlogPost implements Node & Post {
      id: ID!
      body: String
      categories: [Category] @link(from: "tags.value")
      coverImage: File
      date: Date @dateformat
      slug: String
      title: String
    }
    
    type Recipe implements Node & Post {
      id: ID!
      body: String
      categories: [Category] @link(from: "tags.value")
      category: [Category] @link(from: "category.value")
      coverImage: File
      date: Date @dateformat
      ingredients: [String]
      slug: String
      timeToCook: String
      title: String
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers, schema }) => {
  createResolvers({
    BlogPost: {
      body: {
        type: "String",
        resolve: mdxResolverPassthrough("body"),
      },
    },
    Recipe: {
      body: {
        type: "String",
        resolve: mdxResolverPassthrough("body"),
      },
      ingredients: {
        type: "[String]",
        async resolve(source, args, context, info) {
          // We use `ingredients` for the search functionality so ingredients need to be extracted as strings
          const ast = await mdxResolverPassthrough("mdxAST")(
            source,
            args,
            context,
            info
          )
          let res = []
          visit(ast, "jsx", (node, index, parent) => {
            if (node.value.startsWith("<Ingredients")) {
              const nextSibling = parent.children[index + 1]
              visit(nextSibling, "listItem", (li) => {
                res.push(toString(li))
              })
            }
          })
          return res
        },
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
          slug: `/${recipesPath}/${slug(obj.id)}`,
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
    function getType(path) {
      switch (path) {
        case blogPath: {
          return "BlogPost"
        }
        case recipesPath: {
          return "Recipe"
        }
        default: {
          return null
        }
      }
    }
    const path = parent.sourceInstanceName
    const type = getType(path)
    if (type == null) {
      return // Do not create additional node if there is no match
    }
    const slug = createFilePath({ node, getNode, basePath })
    const fieldData = {
      ...frontmatter,
      slug: `/${path}${slug}`,
    }

    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> ${type}`),
      parent: node.id,
      children: [],
      internal: {
        type,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
      },
    })
    createParentChildLink({
      parent: parent,
      child: node,
    })
  }
}

// These templates are simply data-fetching wrappers that import components
const BlogPostTemplate = require.resolve("./src/templates/blogpost-query")
const BlogPostsTemplate = require.resolve("./src/templates/blogposts-query")
const RecipeTemplate = require.resolve("./src/templates/recipe-query")
const RecipesTemplate = require.resolve("./src/templates/recipes-query")
const CategoryTemplate = require.resolve("./src/templates/category-query")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
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
  const { allBlogPost, allRecipe, allCategory } = result.data
  const categories = allCategory.nodes
  const blogPosts = allBlogPost.edges
  const recipes = allRecipe.edges

  // Create a page for each BlogPost
  blogPosts.forEach(({ node: post }, index) => {
    const previous = index === recipes.length - 1 ? null : recipes[index + 1]
    const next = index === 0 ? null : recipes[index - 1]
    createPage({
      path: post.slug,
      component: BlogPostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  // Create a page for each Recipe
  recipes.forEach(({ node: post }, index) => {
    createPage({
      path: post.slug,
      component: RecipeTemplate,
      context: {
        id: post.id,
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

  // Create the BlogPosts page
  createPage({
    path: blogPath,
    component: BlogPostsTemplate,
    context: {},
  })

  // Create the Recipes page
  createPage({
    path: recipesPath,
    component: RecipesTemplate,
    context: {},
  })
}
