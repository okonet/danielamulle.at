import React from "react"
import { Box, Card, Container, Grid, Styled, Text } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import Img from "gatsby-image"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"
import { recipesPath } from "../../paths"

export default ({ data }) => {
  const { category } = data
  return (
    <Layout theme={recipesTheme}>
      <SEO title={category.id} />

      <Container>
        <Styled.h1>{category.id}</Styled.h1>
      </Container>

      {category.recipes ? (
        <Container variant="full">
          <Grid gap={4} columns={[1, 3]}>
            {category.recipes.map((recipe) => (
              <RecipeCard {...recipe} key={recipe.id} />
            ))}
          </Grid>
        </Container>
      ) : (
        <Container>
          <Text as="p" sx={{ color: "muted" }}>
            Keine Rezepte für diese Kategorie gefunden.{" "}
            <Link to={recipesPath}>Alle Rezepte</Link> anschauen?
          </Text>
        </Container>
      )}
    </Layout>
  )
}
