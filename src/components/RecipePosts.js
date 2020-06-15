import React from "react"
import { Box, Card, Container, Grid, Styled, Text } from "theme-ui"
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
      </Container>

      <Container variant="full">
        <Grid gap={4} columns={[1, 3]}>
          {data.allMdxRecipe.nodes.map((post) => (
            <Card key={post.id}>
              {post.frontmatter.coverImage && (
                <Link to={post.slug}>
                  <Img
                    fluid={post.frontmatter.coverImage.childImageSharp.fluid}
                  />
                </Link>
              )}
              <Box
                sx={{
                  px: 3,
                  py: 2,
                }}
              >
                <Text
                  as="h2"
                  sx={{
                    color: "accent",
                    fontSize: 1,
                    fontFamily: "body",
                    mb: 2,
                  }}
                >
                  <Link to={post.slug}>{post.frontmatter.title}</Link>
                </Text>
                <Text as="p">
                  <Box
                    as="time"
                    sx={{
                      fontSize: 0,
                      fontFamily: "monospace",
                      fontWeight: "body",
                      color: "muted",
                    }}
                  >
                    {post.frontmatter.date}
                  </Box>
                </Text>
                {post.frontmatter.categories && (
                  <Text as="p">
                    {post.frontmatter.categories.map((category) => (
                      <Link to={category.fields.slug} key={category.id}>
                        {category.id}
                      </Link>
                    ))}
                  </Text>
                )}
              </Box>
            </Card>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
