/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import Layout from "./layout"
import Link from "./Link"
import { blogTheme } from "../theme"
import { blogPath } from "../../paths"
import Tag from "./Tag"
import Group from "react-group"
import Img from "gatsby-image"
import SEO from "./seo"

export default ({ data, pageContext }) => {
  const { body, coverImage, title, categories } = data.blogPost
  return (
    <Layout theme={blogTheme}>
      <SEO title={title} ogImage={pageContext.ogImage} />
      <Img
        fluid={coverImage.childImageSharp.fluid}
        style={{
          position: "relative",
          maxHeight: 500,
        }}
      />
      <Container variant="section">
        <Grid gap={0} columns={[1, 12]}>
          <Box
            as="nav"
            sx={{ color: "muted", fontSize: 0, gridColumn: [1, "1 / span 8"] }}
          >
            <Group separator=" → ">
              <Link to={blogPath}>← Alle Blog Einträge</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              mt: 1,
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
              "& > p:first-of-type": {
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
