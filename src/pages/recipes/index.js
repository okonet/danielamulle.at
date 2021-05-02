import React from "react"
import { getAllPostsAndCategories } from "../api/posts"
import RecipesPosts from "../../components/RecipesPosts"
import FlexSearch from "flexsearch"
import visit from "unist-util-visit"
import toString from "mdast-util-to-string"
import fromMarkdown from "mdast-util-from-markdown"
import syntax from "micromark-extension-mdxjs"
import mdx from "mdast-util-mdx"
import renderToString from "next-mdx-remote/render-to-string"
import components from "../../gatsby-plugin-theme-ui/components"
import { getSection } from "../api/sections"
import smartypants from "@silvenon/remark-smartypants"

export async function getStaticProps() {
  const collection = "recipes"
  const [recipes, categories] = getAllPostsAndCategories(collection)

  // Get section and parse section content as MDX
  let section = getSection(collection)
  const { content } = section
  if (content) {
    const sectionMDX = await renderToString(content, {
      components,
      mdxOptions: {
        remarkPlugins: [smartypants],
      },
    })
    section = {
      ...section,
      body: sectionMDX,
    }
  }

  const recipesWithIngredients = recipes.map((recipe) => {
    const tree = fromMarkdown(recipe.content, {
      extensions: [syntax()],
      mdastExtensions: [mdx.fromMarkdown],
    })

    let ingredients = []
    visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
      // Search for `<Ingredients>` node
      if (node.name === "Ingredients") {
        // Search for list items
        visit(node, "listItem", (li, index, parent) => {
          // Get the content of each list them
          ingredients.push(toString(li))
        })
      }
    })

    return {
      ...recipe,
      ingredients: ingredients.join(", "),
    }
  })

  const searchDoc = {
    id: "id",
    field: ["title", "ingredients"],
    store: ["id", "title", "ingredients"],
  }
  const index = FlexSearch.create({ doc: searchDoc })
  index.add(recipesWithIngredients)

  // TODO: Should grouping happening here?

  return {
    props: {
      section,
      collection,
      posts: recipesWithIngredients,
      categories,
      searchIndex: index.export(),
      searchDoc,
    },
  }
}

export default function RecipesPage(props) {
  return <RecipesPosts {...props} />
}
