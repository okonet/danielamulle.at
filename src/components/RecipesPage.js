import React from "react"
import { Container, Grid, Styled } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"

export default ({ data }) => {
  return (
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />

      <Container>
        <Styled.h1>Rezepte</Styled.h1>
      </Container>

      <Container variant="full">
        <Grid gap={4} columns={[1, 3]}>
          {data.allRecipe.nodes.map((post) => (
            <RecipeCard {...post} key={post.id} />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
