/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import Layout from "./layout"
import Link from "./Link"
import { recipesTheme } from "../theme"
import { recipesPath } from "../../paths"
import Tag from "./Tag"
import Group from "react-group"
import Img from "gatsby-image"

export default ({ data }) => {
  const {
    body,
    coverImage,
    title,
    category,
    categories,
    timeToCook,
  } = data.recipe
  const description =
    "Dieses Gericht beweist, dass Eintöpfe kein Fleisch brauchen, um so richtig herzhaft-vollmundig zu schmecken - probier’s aus, du wirst begeistert sein!"
  const mainCategory = category[0]
  return (
    <Layout theme={recipesTheme}>
      <Img
        fluid={coverImage.childImageSharp.fluid}
        style={{
          position: "relative",
          maxHeight: 440,
        }}
      />
      <Container
        variant="full"
        sx={{
          px: 4,
          pl: [4, 5],
          py: 4,
          mt: -4,
          bg: "white",
          borderRadius: ["none", "none", "medium"],
          // boxShadow: ["none", "float"],
          zIndex: 1,
        }}
      >
        <Grid gap={0} columns={[1, 12]}>
          <Box as="nav" sx={{ color: "muted", gridColumn: [1, "1 / span 8"] }}>
            <Group separator=" / ">
              <Link to={recipesPath}>Rezepte</Link>
              <Link to={mainCategory.slug}>{mainCategory.id}</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              mt: 0,
              gridColumn: [1, "1 / span 12"],
              ":first-letter": { textTransform: "uppercase" },
            }}
          >
            {title}
          </Styled.h1>

          <Box
            sx={{
              gridColumn: [1, "10 / span 3"],
              gridRow: "3 / span 2",
            }}
          >
            <Styled.h3>Zubereitungszeit</Styled.h3>
            <Styled.p>{timeToCook}</Styled.p>
            {categories && (
              <>
                <Styled.h3>Kategorien</Styled.h3>
                <Box sx={{ my: 2, mx: -2 }}>
                  <Group as="p" separator=" ">
                    {categories.map((category) => (
                      <Tag key={category.id} sx={{ my: 1 }}>
                        <Link to={category.slug}>{category.id}</Link>
                      </Tag>
                    ))}
                  </Group>
                </Box>
              </>
            )}
          </Box>

          <Box
            sx={{
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 9],
              "& > p:first-child": {
                variant: "textStyles.lead",
              },
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
