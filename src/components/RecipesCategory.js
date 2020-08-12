/* @jsx jsx */
import React from "react"
import { Box, Container, jsx, Styled, Text } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import { recipesTheme } from "../theme"
import { recipesPath } from "../../paths"
import groupBy from "lodash.groupby"
import RecipesList from "./RecipesList"
import Group from "react-group"
import Section from "./Section"

export default ({ data }) => {
  const { category } = data
  const groupedRecipes = groupBy(
    category.posts,
    (node) => node.categories[0].id
  )
  return (
    <Layout theme={recipesTheme}>
      <SEO title={`Rezepte: ${category.id}`} />

      <Section theme={recipesTheme} blendMode="color-burn">
        <Box as="nav" sx={{ mt: 5 }}>
          <Group separator=" / ">
            <Link to={recipesPath}>Rezepte</Link>
          </Group>
        </Box>
        <Styled.h1
          sx={{
            mt: 0,
            mb: 3,
            ":first-letter": { textTransform: "uppercase" },
          }}
        >
          {category.id}
        </Styled.h1>
      </Section>

      {category.postCount > 0 ? (
        <RecipesList recipes={groupedRecipes} />
      ) : (
        <Container>
          <Text as="p" sx={{ variant: "textStyles.lead", color: "secondary" }}>
            Keine Rezepte für diese Kategorie gefunden.{" "}
            <Link to={recipesPath}>Alle Rezepte</Link>.
          </Text>
        </Container>
      )}
    </Layout>
  )
}
