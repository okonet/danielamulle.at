/* @jsx jsx */
import React from "react"
import { Container, Grid, Styled, jsx } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"
import Content, * as meta from "../../content/sections/blog.mdx"

export default ({ data }) => {
  const { allBlogPost } = data

  return (
    <Layout theme={recipesTheme}>
      <SEO title={meta._frontmatter.title} />
      <Container variant={"full"}>
        <Content />
        <Grid gap={3} columns={[1, 2, 3]} sx={{ mb: 4 }}>
          {allBlogPost.nodes.map((post) => (
            <RecipeCard {...post} key={post.id} />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
