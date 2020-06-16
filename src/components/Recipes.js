import React from "react"
import { Box, Card, Container, Grid, Styled, Text } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import Img from "gatsby-image"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"

export default ({ data }) => {
  return (
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />

      <Container>
        <Styled.h1>Rezepte für jeden Tag</Styled.h1>
      </Container>

      <Container variant="full">
        <Grid gap={4} columns={[1, 3]}>
          {data.allMdxRecipe.nodes.map((post) => (
            <RecipeCard {...post} key={post.id} />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
