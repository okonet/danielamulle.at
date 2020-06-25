/* @jsx jsx */
import React from "react"
import { Box, Flex, Container, Grid, jsx, Styled, Text } from "theme-ui"
import { useFlexSearch } from "react-use-flexsearch"
import groupBy from "lodash.groupby"
import keyBy from "lodash.keyby"
import SEO from "../components/seo"
import Group from "react-group"
import Layout from "../components/layout"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"
import Link from "./Link"
import Tag from "./Tag"
import Content from "../../content/sections/recipes.mdx"

export default ({ data }) => {
  const { allCategory, allRecipe } = data
  const [query, setQuery] = React.useState("")
  const { index, store } = data.localSearchRecipes
  const results = useFlexSearch(query, index, JSON.parse(store))
  const resIds = results.map((res) => res.id)
  const tags = allCategory.nodes
  const filteredRecipes = query
    ? allRecipe.nodes.filter((recipe) => resIds.includes(recipe.id))
    : allRecipe.nodes
  const groupedRecipes = groupBy(filteredRecipes, (node) => node.category[0].id)
  return (
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />

      <Container>
        <Content />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <Box as="aside">
          {tags && (
            <Group as="nav" separator={" "}>
              {tags.map((tag) => (
                <Tag key={tag.id} sx={{ my: 1, color: "text" }}>
                  <Link to={tag.slug} key={tag.id}>
                    {tag.id}
                  </Link>
                  <Text as="span" sx={{ pl: 1, fontSize: 0, color: "muted" }}>
                    ×
                  </Text>
                  <Text as="span" sx={{ pl: 1, fontSize: 0, color: "muted" }}>
                    {tag.recipeCount}
                  </Text>
                </Tag>
              ))}
            </Group>
          )}
        </Box>
      </Container>

      {Object.entries(groupedRecipes).map(([category, recipe]) => (
        <React.Fragment key={category}>
          <Container>
            <Text as="h2" sx={{ variant: "textStyles.subTitle", my: 3 }}>
              {category} <Tag>{recipe.length}</Tag>
            </Text>
          </Container>
          <Container variant={"full"}>
            {recipe.length > 0 && (
              <Grid gap={3} columns={[1, 2, 3]} sx={{ mb: 4 }}>
                {recipe.map((recipe) => (
                  <RecipeCard {...recipe} key={recipe.id} />
                ))}
              </Grid>
            )}
          </Container>
        </React.Fragment>
      ))}
    </Layout>
  )
}
