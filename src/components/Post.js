/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import Layout from "./layout"
import { recipesTheme } from "../theme"
import Link from "../components/Link"
import Section from "./Section"
import { ParallaxGroup, ParallaxLayer } from "./Parallax"

export default ({ data }) => {
  console.log(data.mdx.frontmatter.coverImage.childImageSharp.fluid)
  return (
    <Layout theme={recipesTheme}>
      <ParallaxGroup
        as="section"
        sx={{
          minHeight: 500,
        }}
      >
        <ParallaxLayer depth={1}>
          <Img
            fluid={data.mdx.frontmatter.coverImage.childImageSharp.fluid}
            sx={{
              minHeight: 600,
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer>
          <Container
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: 500,
            }}
          >
            <Grid gap={3} sx={{ my: 3 }}>
              <Link
                to={"/posts"}
                sx={{
                  color: "muted",
                  fontSize: 0,
                  fontFamily: "monospace",
                  fontWeight: "heading",
                  textDecoration: "none",
                }}
              >
                ← Rezepte
              </Link>
              <Styled.h1 sx={{ m: 0 }}>
                <Styled.strong
                  sx={{
                    p: 1,
                    lineHeight: 1.45,
                    display: "inline",
                    bg: "accent",
                    color: "background",
                  }}
                >
                  {data.mdx.frontmatter.title}
                </Styled.strong>
              </Styled.h1>
              <Grid
                gap={2}
                sx={{
                  fontSize: 0,
                  fontFamily: "monospace",
                  color: "muted",
                }}
              >
                <Box as="p">
                  <datetime>{data.mdx.frontmatter.date}</datetime>
                </Box>
                <Box as="p">
                  Zeit:{" "}
                  <datetime> {data.mdx.frontmatter.timeToCook} min</datetime>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </ParallaxLayer>
      </ParallaxGroup>

      <Section sx={{ py: 4 }}>
        <Grid
          gap={4}
          columns={[1, 2]}
          sx={{
            py: [0, 4],
            mx: [0, -2],
          }}
        >
          <Box
            sx={{
              px: [0, 4],
              py: [0, 3],
              bg: "background",
              borderRadius: ["none", "medium"],
              boxShadow: ["none", "float"],
            }}
          >
            <Styled.h2>Zutaten</Styled.h2>
            <Box
              as="ul"
              sx={{
                mt: 3,
                pl: 0,
                listStyle: "none",
                fontFamily: "monospace",
                fontSize: 1,
              }}
            >
              {data.mdx.frontmatter.ingredients.map((item) => (
                <Box
                  as="li"
                  key={item}
                  sx={{
                    mb: 2,
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Styled.h2>
              Näherungswerte <small>per 100g</small>
            </Styled.h2>
            <Grid
              as="dl"
              gap={2}
              columns={2}
              sx={{
                mt: 3,
                pl: 0,
                listStyle: "none",
                fontFamily: "monospace",
                fontSize: 1,
              }}
            >
              <Box as="dt">Fette</Box>
              <Box as="dd">{data.mdx.frontmatter.nutrition.fat}</Box>
              <Box as="dt">Kalorien</Box>
              <Box as="dd">{data.mdx.frontmatter.nutrition.cal}</Box>
            </Grid>
          </Box>
        </Grid>
        <Box sx={{ my: 4 }}>
          <Styled.h2>Zubereitung</Styled.h2>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Box>
      </Section>
    </Layout>
  )
}
