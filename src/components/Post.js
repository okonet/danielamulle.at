/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { transparentize } from "@theme-ui/color"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import Layout from "./layout"
import { recipesTheme } from "../theme"
import Link from "../components/Link"
import Section from "./Section"

export default ({ data }) => {
  console.log(data.mdx.frontmatter.coverImage.childImageSharp.fixed)
  return (
    <Layout theme={recipesTheme}>
      <Section
        theme={recipesTheme}
        coverSrc={data.mdx.frontmatter.coverImage.childImageSharp.fixed.srcSet}
      >
        <Grid gap={2} sx={{ mt: 6, mb: 4 }}>
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
                display: "inline",
                p: 1,
                lineHeight: 1.46,
                bg: transparentize("text", 0.25),
                color: "background",
              }}
            >
              {data.mdx.frontmatter.title}
            </Styled.strong>
          </Styled.h1>
          <Styled.p sx={{ m: 0 }}>
            <Box
              as="time"
              sx={{
                display: "inline",
                p: 1,
                fontSize: 0,
                fontFamily: "monospace",
                fontWeight: "body",
                bg: transparentize("text", 0.25),
                color: "background",
              }}
            >
              {data.mdx.frontmatter.date}
            </Box>
          </Styled.p>
        </Grid>
      </Section>

      <Container variant="full">
        <Grid
          gap={3}
          columns={12}
          sx={{
            position: "relative",
            mt: -5,
            py: [0, 4],
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              gridColumn: "2 / span 7",
              px: [0, 5],
              py: [0, 4],
              ml: [0, -5],
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
          <Box
            sx={{
              mt: 5,
              gridColumn: "9 / span 4",
            }}
          >
            <Styled.h2>
              Zubereitungszeit {data.mdx.frontmatter.timeToCook} min
            </Styled.h2>

            <Styled.h2>
              Nahrungswerte <small>per 100g</small>
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
      </Container>
      <Container variant="full">
        <Grid
          gap={3}
          columns={12}
          sx={{
            py: [0, 4],
          }}
        >
          <Box
            sx={{
              gridColumnStart: 2,
              gridColumnEnd: 10,
            }}
          >
            <Styled.h2>Zubereitung</Styled.h2>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
