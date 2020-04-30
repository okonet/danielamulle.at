import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { Box, Container, Flex, Grid, Styled, ThemeProvider } from "theme-ui"
import Layout from "./layout"
import { recipesTheme } from "../theme"
import Link from "../components/Link"

export default ({ data }) => {
  return (
    <Layout>
      <ThemeProvider theme={recipesTheme}>
        <Box sx={{ bg: "background" }}>
          <Container>
            <Grid gap={2} columns={[1, 2]}>
              <Box>
                <Link
                  to={"/posts"}
                  sx={{
                    color: "orange.2",
                    fontSize: 0,
                    fontFamily: "monospace",
                    fontWeight: "heading",
                    textDecoration: "none",
                  }}
                >
                  ← Rezepte
                </Link>
                <Styled.h1>{data.mdx.frontmatter.title}</Styled.h1>
                <Box>
                  <datetime>{data.mdx.frontmatter.date}</datetime>
                </Box>
                <Box>
                  <datetime>{data.mdx.frontmatter.timeToCook} min</datetime>
                </Box>
              </Box>
              <Box
                sx={{
                  p: [0, 2],
                  mb: [0, -5],
                  bg: "gray.6",
                  transform: ["none", "rotate(4deg)"],
                  boxShadow: ["none", "float"],
                }}
              >
                <Img
                  fluid={data.mdx.frontmatter.coverImage.childImageSharp.fluid}
                />
              </Box>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
      <Container>
        <Box
          sx={{
            p: 4,
            mx: -4,
            mt: [0, -4],
            bg: "background",
            boxShadow: ["none", "float"],
          }}
        >
          <Styled.h2>Zutaten</Styled.h2>
          {data.mdx.frontmatter.ingredients && (
            <Box
              as="ul"
              sx={{
                mt: 3,
                pl: 0,
                listStyle: "none",
                fontFamily: "monospace",
                fontSize: 0,
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
          )}
        </Box>
        <Box sx={{ my: 4 }}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Box>
      </Container>
    </Layout>
  )
}
