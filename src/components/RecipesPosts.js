/* @jsx jsx */
import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { Flex, Input, jsx, Text } from "theme-ui"
import FlexSearch from "flexsearch"
import { groupBy } from "lodash"
import Group from "react-group"
import { recipesTheme } from "../theme"
import Link from "./Link"
import Tag from "./Tag"
import RecipesList from "./RecipesList"
import PageLayout from "./PageLayout"
import { useRouter } from "next/router"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

export const useFlexSearch = (query, providedIndex, doc, searchOptions) => {
  const [index, setIndex] = useState(null)

  useEffect(() => {
    const importedIndex = FlexSearch.create({ doc })
    importedIndex.import(providedIndex)

    setIndex(importedIndex)
  }, [providedIndex])

  return useMemo(() => {
    if (!query || !index) return []

    const rawResults = index.search(query, searchOptions)
    return rawResults.map((res) => res.id)
  }, [query, index])
}

const RecipesPosts = ({ categories, posts, searchIndex, searchDoc, post }) => {
  const router = useRouter()
  const { query } = router
  const { q: searchQuery = "" } = query
  const matches = useFlexSearch(searchQuery, searchIndex, searchDoc, {
    field: "ingredients",
  })

  const filteredRecipes = searchQuery
    ? posts.filter((recipe) => matches.includes(recipe.id))
    : posts

  const groupedRecipes = groupBy(
    filteredRecipes,
    (post) => post.categories[0].id
  )

  const handleChange = (event) => {
    router.replace(
      {
        query: {
          q: event.target.value,
        },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      }
    )
  }

  return (
    <PageLayout theme={recipesTheme} title={post.title}>
      {hydrate(post.body, { components })}
      <Flex
        as="aside"
        sx={{
          my: 3,
          flexWrap: "wrap",
          alignItems: "baseline",
        }}
      >
        <Input
          type="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Filter nach Zutaten..."
          sx={{
            p: 1,
            fontSize: 0,
            width: ["100%", 225],
          }}
        />
        <Text
          sx={{
            display: ["none", "block"],
            mx: 2,
            fontSize: 0,
            color: "secondary",
          }}
        >
          {" oder wähle eine Kategorie: "}
        </Text>
        {categories && (
          <Group as="nav" separator={" "}>
            {categories.map((tag) => (
              <Tag key={tag.id} sx={{ my: 1, mr: 2, color: "text" }}>
                <Link to={tag.slug} key={tag.id}>
                  {tag.id}
                </Link>
                <Text as="span" sx={{ pl: 1, fontSize: 0, color: "muted" }}>
                  ×
                </Text>
                <Text as="span" sx={{ pl: 1, fontSize: 0, color: "secondary" }}>
                  {tag.postCount}
                </Text>
              </Tag>
            ))}
          </Group>
        )}
      </Flex>

      <RecipesList recipes={groupedRecipes} />
    </PageLayout>
  )
}

export default RecipesPosts
