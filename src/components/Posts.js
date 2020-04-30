import React from "react"
import { Grid, Card, Styled } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import Img from "gatsby-image"
import Section from "./Section"
import { recipesTheme } from "../theme"

export default ({ data }) => {
  return (
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />
      <Section name="recipes">
        <Styled.h1>Rezepte für jeden Tag</Styled.h1>
      </Section>
      <Section>
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
      </Section>
    </Layout>
  )
}
