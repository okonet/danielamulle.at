/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, jsx, Styled } from "theme-ui"
import Link from "./Link"
import { blogTheme } from "../theme"
import { blogPath } from "../../paths"
import Group from "react-group"
import ShareButtons from "./ShareButtons"
import TagList from "./TagList"
import PageLayout from "./PageLayout"
import PostTemplate from "./PostTemplate"

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
              "@media print": {
                visibility: "hidden",
              },
            }}
          >
            <Group separator=" → ">
              <Link to={`/${blogPath}`}>← Alle Blog Einträge</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              mt: 1,
              variant: "textStyles.pageTitle",
            }}
          >
            {title}
          </Styled.h1>
        </Box>
      }
    >
      <PostTemplate
        main={<MDXRenderer>{body}</MDXRenderer>}
        sidebar={
          <>
            <Styled.h3>Veröffentlicht am</Styled.h3>
            <Styled.p>{date}</Styled.p>

            <TagList tags={categories} />
            <ShareButtons pageUrl={pageUrl} title={title} />
          </>
        }
      />
    </PageLayout>
  )
}
