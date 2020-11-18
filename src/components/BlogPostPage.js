/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Grid, jsx, Styled } from "theme-ui"
import Link from "./Link"
import { blogTheme } from "../theme"
import { blogPath } from "../../paths"
import Group from "react-group"
import ShareButtons from "./ShareButtons"
import TagList from "./TagList"
import PageLayout from "./PageLayout"

export default ({ data, location }) => {
  const { post, site } = data
  const {
    body,
    date,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    socialImage,
    title,
    categories,
  } = post
  const pageUrl = location.href ? location.href : site.siteMetadata.url
  return (
    <PageLayout
      theme={blogTheme}
      title={title}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
      socialImage={socialImage}
      heading={
        <Box sx={{ mx: [0, 0, -4] }}>
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
        </Box>
      }
    >
      <Grid gap={4} columns={[1, 12]} sx={{ mx: [0, 0, -4] }}>
        <Box
          sx={{
            gridColumnStart: [1, 1],
            gridColumnEnd: [1, 11],
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
            gridColumn: [1, 1, "11 / span 2"],
          }}
        >
          <Styled.h3 sx={{ m: 0, mr: 2 }}>Veröffentlicht am</Styled.h3>
          <Styled.p>{date}</Styled.p>

          <TagList tags={categories} />
          <ShareButtons pageUrl={pageUrl} title={title} />
        </Box>
      </Grid>
    </PageLayout>
  )
}
