/* @jsx jsx */
import React, { useCallback } from "react"
import { Container, Flex, jsx, Text, Input } from "theme-ui"
import { useFlexSearch } from "react-use-flexsearch"
import groupBy from "lodash.groupby"
import SEO from "../components/seo"
import Group from "react-group"
import Layout from "../components/layout"
import { recipesTheme } from "../theme"
import Link from "./Link"
import Tag from "./Tag"
import Content from "../../content/sections/recipes.mdx"
import RecipesList from "./RecipesList"

export default ({ data, location, navigate }) => {
  const { allCategory, allPost } = data
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""
  const { index, store } = data.localSearchRecipes
  const results = useFlexSearch(query, index, JSON.parse(store))
  const resIds = results.map((res) => res.id)
  const tags = allCategory.nodes
  const filteredRecipes = query
    ? allPost.nodes.filter((recipe) => resIds.includes(recipe.id))
    : allPost.nodes
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
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />

      <Container>
        <Content />
        <Flex
          as="aside"
          sx={{
            my: 4,
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
              width: 225,
            }}
          />
          <Text sx={{ mx: 2, fontSize: 0, color: "secondary" }}>
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
                  <Text
                    as="span"
                    sx={{ pl: 1, fontSize: 0, color: "secondary" }}
                  >
                    {tag.postCount}
                  </Text>
                </Tag>
              ))}
            </Group>
          )}
        </Flex>
      </Container>

      <RecipesList recipes={groupedRecipes} />
    </Layout>
  )
}
