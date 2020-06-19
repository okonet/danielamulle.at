/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { transparentize } from "@theme-ui/color"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import Layout from "./layout"
import Link from "./Link"
import Section from "./Section"
import { recipesTheme } from "../theme"
import { recipesPath } from "../../paths"
import CategoryTags from "./CategoryTags"

export default ({ data }) => {
  const {
    body,
    coverImage,
    date,
    title,
    category,
    categories,
    ingredients,
    timeToCook,
  } = data.recipe
  return (
    <Layout theme={recipesTheme}>
      <Section
        theme={recipesTheme}
        coverFluid={coverImage.childImageSharp.fluid}
      >
        <Grid
          gap={2}
          sx={{
            mt: 6,
            mb: 4,
            "& > * > *": {
              display: "inline",
              p: 1,
              lineHeight: 1.46,
              bg: transparentize("text", 0.25),
              color: "background",
            },
          }}
        >
          <Box as="nav">
            <Link
              to={recipesPath}
              sx={{
                fontSize: 0,
                fontFamily: "monospace",
                fontWeight: "heading",
                textDecoration: "none",
                color: "background",
                ":hover": {
                  bg: transparentize("accent", 0.25),
                  color: "text",
                },
              }}
            >
              ← Rezepte
            </Link>
          </Box>
          <Styled.h1 sx={{ m: 0 }}>
            <span>{title}</span>
          </Styled.h1>
        </Grid>
      </Section>

      <Container variant="full">
        <Grid
          gap={3}
          columns={[1, 12]}
          sx={{
            position: "relative",
            mt: [3, -5],
            px: [4, 0],
            py: [0, 4],
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              order: [1, 2],
              gridColumn: [1, "2 / span 7"],
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
              {ingredients.map((item) => (
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
              order: [1, 2],
              mt: [3, 5],
              mb: [4, 0],
              gridColumn: [1, "9 / span 4"],
            }}
          >
            <Styled.h3>Zubereitungszeit</Styled.h3>
            <Styled.p>{timeToCook}</Styled.p>

            <Styled.h3>Kategorien</Styled.h3>
            {categories && <CategoryTags categories={categories} />}
          </Box>
        </Grid>
      </Container>
      <Container variant="full">
        <Grid
          gap={3}
          columns={[1, 12]}
          sx={{
            px: [4, 0],
            py: [0, 4],
          }}
        >
          <Box
            sx={{
              gridColumnStart: [1, 2],
              gridColumnEnd: [1, 10],
            }}
          >
            <Styled.h2>Zubereitung</Styled.h2>
            <MDXRenderer>{body}</MDXRenderer>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
