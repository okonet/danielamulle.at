/* @jsx jsx */
import React from "react"
import { Container, Grid, jsx } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { blogTheme } from "../theme"
import RecipeCard from "./RecipeCard"
import Content, * as meta from "../../content/sections/blog.mdx"
import Section from "./Section"

export default ({ data }) => {
  const { allBlogPost } = data

  return (
    <Layout theme={blogTheme}>
      <SEO title={meta._frontmatter.title} />
      <Section
        theme={blogTheme}
        blendMode="soft-light"
        sx={{ minHeight: 320, pt: 6 }}
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
