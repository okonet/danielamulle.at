/* @jsx jsx */
import * as React from "react"
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
import { useRouter } from "next/router"

const RecipesPosts = ({ data }) => {
  const router = useRouter()
  const { query } = router
  const { q: searchQuery } = query
  const {
    collection,
    categories,
    posts: recipes,
    localSearchRecipes = {},
  } = data

  // const { index, store } = localSearchRecipes
  // const results = useFlexSearch(query, index, JSON.parse(store))
  const resIds = [] //results.map((res) => res.id)
  const tags = categories

  const filteredRecipes = searchQuery
    ? recipes.filter((recipe) => resIds.includes(recipe.id))
    : recipes
  const groupedRecipes = groupBy(
    filteredRecipes,
    (post) => post.categories[0].id
  )

  const handleChange = (event) => {
    router.replace(
      {
        query: {
          collection,
          q: event.target.value,
        },
      },
      undefined,
      {
        scroll: false,
      }
    )
  }

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
