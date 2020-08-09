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
import CoverImage from "./CoverImage"

export default ({ data, pageContext }) => {
  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    title,
    categories,
  } = data.post
  return (
    <Layout theme={blogTheme}>
      <SEO title={title} ogImage={pageContext.ogImage} />
      <CoverImage
        fluid={coverImage.childImageSharp.fluid}
        author={coverImageAuthor || "Andrey Okonetchnikov"}
        url={coverImageLink || "https://okonet.ru"}
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
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 12],
              ":first-letter": { textTransform: "uppercase" },
            }}
          >
            {title}
          </Styled.h1>

          <Box
            sx={{
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 12],
              "& > p:first-of-type": {
                variant: "textStyles.lead",
              },
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "baseline",
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 12],
            }}
          >
            {categories && (
              <>
                <Styled.h3 sx={{ m: 0, mr: 2 }}>Kategorien:</Styled.h3>
                <Box sx={{ m: 0 }}>
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
        </Grid>
      </Container>
    </Layout>
  )
}
