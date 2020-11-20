/* @jsx jsx */
import React from "react"
import { Box, Container, jsx, Styled, Text } from "theme-ui"
import Link from "../components/Link"
import { recipesTheme } from "../theme"
import { recipesPath } from "../../paths"
import groupBy from "lodash.groupby"
import RecipesList from "./RecipesList"
import Group from "react-group"
import PageLayout from "./PageLayout"

export default ({ data }) => {
  const { category } = data
  const groupedRecipes = groupBy(
    category.posts,
    (node) => node.categories[0].id
  )
  return (
    <PageLayout
      theme={recipesTheme}
      title={`Rezepte: ${category.id}`}
      heading={
        <>
          <Box as="nav">
            <Group separator=" / ">
              <Link to={`/${recipesPath}`}>Alle Rezepte</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              variant: "textStyles.pageTitle",
            }}
          >
            {category.id}
          </Styled.h1>
        </>
      }
    >
      {category.postCount > 0 ? (
        <RecipesList recipes={groupedRecipes} />
      ) : (
        <Container>
          <Text as="p" sx={{ variant: "textStyles.lead", color: "secondary" }}>
            Keine Rezepte für diese Kategorie gefunden.{" "}
            <Link to={`/${recipesPath}`}>Alle Rezepte</Link>.
          </Text>
        </Container>
      )}
    </PageLayout>
  )
}
