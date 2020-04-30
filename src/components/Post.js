import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { Box, Container, Flex, Grid, Styled, ThemeProvider } from "theme-ui"
import Layout from "./layout"
import { recipesTheme } from "../theme"
import Link from "../components/Link"
import Section from "./Section"

export default ({ data }) => {
  return (
    <Layout theme={recipesTheme}>
      <Section name="recipes">
        <Grid gap={2} columns={[1, 2]}>
          <Box>
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
            <Styled.h1>{data.mdx.frontmatter.title}</Styled.h1>
            <Grid
              gap={2}
              sx={{
                fontSize: 0,
                fontFamily: "monospace",
                color: "muted",
                mb: 4,
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
          </Box>
          <Box
            sx={{
              p: [0, 2],
              mb: [-4, -5],
              mx: [-4, 0],
              bg: "gray.6",
              transform: ["none", "rotate(4deg)"],
              boxShadow: ["none", "float"],
              height: "fit-content",
            }}
          >
            <Img
              fluid={data.mdx.frontmatter.coverImage.childImageSharp.fluid}
            />
          </Box>
        </Grid>
      </Section>
      <Section>
        {data.mdx.frontmatter.ingredients && (
          <Box
            sx={{
              p: [0, 4],
              mx: [0, -2],
              mt: [0, -5],
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
        )}
        <Box sx={{ my: 4 }}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Box>
      </Section>
    </Layout>
  )
}
