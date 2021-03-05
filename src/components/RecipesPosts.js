/* @jsx jsx */
import React, { useCallback } from "react"
import { Flex, Input, jsx, Text } from "theme-ui"
import { useFlexSearch } from "react-use-flexsearch"
import groupBy from "lodash.groupby"
import Group from "react-group"
import { recipesTheme } from "../theme"
import Link from "./Link"
import Tag from "./Tag"
import Content, { title } from "../../content/sections/recipes.mdx"
import RecipesList from "./RecipesList"
import PageLayout from "./PageLayout"

const RecipesPosts = ({ data, location, navigate }) => {
  const { recipesCategories, recipes, localSearchRecipes } = data
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""
  const { index, store } = localSearchRecipes
  const results = useFlexSearch(query, index, JSON.parse(store))
  const resIds = results.map((res) => res.id)
  const tags = recipesCategories.nodes
  const filteredRecipes = query
    ? recipes.nodes.filter((recipe) => resIds.includes(recipe.id))
    : recipes.nodes
  const groupedRecipes = groupBy(
    filteredRecipes,
    (node) => node.categories[0].id
  )

  const handleChange = useCallback((event) => {
    const searchQuery = event.target.value
    searchParams.set("q", searchQuery)
    const nextUrl =
      searchQuery !== ""
        ? `${location.pathname}?${searchParams.toString()}`
        : location.pathname
    navigate(nextUrl, {
      replace: true,
    })
  })

  return (
    <PageLayout theme={recipesTheme} title={title}>
      <Content />
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
          value={query}
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
        {tags && (
          <Group as="nav" separator={" "}>
            {tags.map((tag) => (
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
