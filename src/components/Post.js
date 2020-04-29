import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { Box, Container, Flex, Grid } from "theme-ui"
import Layout from "./layout"

export default ({ data }) => {
  return (
    <Layout>
      <Box sx={{ bg: "orange.6" }}>
        <Container>
          <Grid gap={2} columns={2}>
            <Box>
              <h1>{data.mdx.frontmatter.title}</h1>
              <Box>
                <datetime>{data.mdx.frontmatter.date}</datetime>
              </Box>
              <Box>
                <datetime>{data.mdx.frontmatter.timeToCook} min</datetime>
              </Box>
            </Box>
            <Box
              sx={{
                p: 2,
                mb: -5,
                bg: "background",
                transform: "rotate(4deg)",
                boxShadow: "float",
              }}
            >
              <Img
                fluid={data.mdx.frontmatter.coverImage.childImageSharp.fluid}
              />
            </Box>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Box
          sx={{
            p: 4,
            mx: -4,
            mt: -4,
            bg: "background",
            boxShadow: "float",
          }}
        >
          <h2>Zutaten</h2>
          {data.mdx.frontmatter.ingredients && (
            <ul>
              {data.mdx.frontmatter.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </Box>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Container>
    </Layout>
  )
}
