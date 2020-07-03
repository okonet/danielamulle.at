/* @jsx jsx */
import React from "react"
import { Container, Grid, Styled, jsx } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { recipesTheme, whatTheme } from "../theme"
import RecipeCard from "./RecipeCard"
import Content, * as meta from "../../content/sections/blog.mdx"
import Section from "./Section"
import * as content from "../../content/sections/focus.mdx"

export default ({ data }) => {
  const { allBlogPost } = data

  return (
    <Layout theme={recipesTheme}>
      <SEO title={meta._frontmatter.title} />
      <Section
        theme={recipesTheme}
        blendMode="color-burn"
        sx={{ minHeight: 320, display: "flex", alignItems: "flex-end" }}
      >
        <Content />
      </Section>
      <Container variant={"full"}>
        <Grid gap={3} columns={[1, 2, 3]} sx={{ my: 4 }}>
          {allBlogPost.nodes.map((post) => (
            <RecipeCard {...post} key={post.id} />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
