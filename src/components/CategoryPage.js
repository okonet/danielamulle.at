import React from "react"
import { Box, Card, Container, Grid, Styled, Text } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import Img from "gatsby-image"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"

export default ({ data }) => {
  const { categoriesJson: category } = data
  console.log(category)
  return (
    <Layout theme={recipesTheme}>
      <SEO title={category.id} />

      <Container>
        <Styled.h1>
          {category.id} <small>({category.recipes.length})</small>
        </Styled.h1>
      </Container>

      <Container variant="full">
        <Grid gap={4} columns={[1, 3]}>
          {category.recipes.map((recipe) => (
            <RecipeCard {...recipe} key={recipe.id} />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
