import React from "react"
import { Container, Grid, Heading, Styled } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"
import Link from "./Link"
import Tag from "./Tag"

export default ({ data }) => {
  const { allCategory } = data
  return (
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />

      <Container>
        <Styled.h1>Rezepte</Styled.h1>
      </Container>

      {allCategory.nodes.map((category) => (
        <>
          <Container>
            <Styled.h2>
              <Link to={category.slug}>{category.id}</Link>
            </Styled.h2>
            <Tag>{category.recipes.length}</Tag>
          </Container>
          {category.recipes.length > 0 && (
            <Container variant="full">
              <Grid gap={4} columns={[1, 3]}>
                {category.recipes.map((recipe) => (
                  <RecipeCard {...recipe} key={recipe.id} />
                ))}
              </Grid>
            </Container>
          )}
        </>
      ))}
    </Layout>
  )
}
