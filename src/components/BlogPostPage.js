/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import Layout from "./layout"
import Link from "./Link"
import { blogTheme } from "../theme"
import { blogPath } from "../../paths"
import Group from "react-group"
import SEO from "./seo"
import CoverImage from "./CoverImage"
import ShareButtons from "./ShareButtons"
import TagList from "./TagList"

export default ({ data, pageContext, location }) => {
  const { post, site } = data
  const {
    body,
    date,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    title,
    categories,
  } = post
  const pageUrl = location.href ? location.href : site.siteMetadata.url
  return (
    <Layout theme={blogTheme}>
      <SEO title={title} ogImage={pageContext.ogImage} />
      <CoverImage
        fluid={coverImage.childImageSharp.fluid}
        author={coverImageAuthor || "Andrey Okonetchnikov"}
        url={coverImageLink || "https://okonet.ru"}
      />
      <Container variant="section">
        <Grid gap={4} columns={[1, 12]}>
          <Grid
            gap={2}
            sx={{
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 12],
            }}
          >
            <Box
              as="nav"
              sx={{
                color: "muted",
                fontSize: 0,
              }}
            >
              <Group separator=" → ">
                <Link to={`/${blogPath}`}>← Alle Blog Einträge</Link>
              </Group>
            </Box>
            <Styled.h1
              sx={{
                mt: 1,
                ":first-letter": { textTransform: "uppercase" },
              }}
            >
              {title}
            </Styled.h1>
          </Grid>

          <Box
            sx={{
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 10],
              "& > p:first-of-type": {
                variant: "textStyles.lead",
              },
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </Box>

          <Box
            as="aside"
            sx={{
              my: 3,
              gridColumn: [1, "10 / span 3"],
              gridRow: [3, 2],
            }}
          >
            <Styled.h3 sx={{ m: 0, mr: 2 }}>Veröffentlicht am</Styled.h3>
            <Styled.p>{date}</Styled.p>

            <TagList tags={categories} />
            <ShareButtons pageUrl={pageUrl} title={title} />
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
