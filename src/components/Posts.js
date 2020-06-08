import React from "react"
import { Card, Container, Grid, Styled } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import Img from "gatsby-image"
import { recipesTheme } from "../theme"

export default ({ data }) => {
  return (
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />

      <Container>
        <Styled.h1>Rezepte für jeden Tag</Styled.h1>
        <Grid gap={4} columns={[1, 3]}>
          {data.allMdx.edges.map(({ node: post }) => (
            <Link to={post.fields.slug}>
              <Card key={post.id}>
                {post.frontmatter.coverImage && (
                  <Img
                    fluid={post.frontmatter.coverImage.childImageSharp.fluid}
                  />
                )}
                {post.frontmatter.title}
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
