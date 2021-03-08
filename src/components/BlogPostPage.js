/** @jsx jsx */
import React from "react"
import { Box, jsx, Styled } from "theme-ui"
import Link from "./Link"
import { blogTheme } from "../theme"
import Group from "react-group"
import ShareButtons from "./ShareButtons"
import TagList from "./TagList"
import PageLayout from "./PageLayout"
import PostTemplate from "./PostTemplate"
import { useRouter } from "next/router"
import config from "../../site.config"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

export default function BlogPostPage({ post }) {
  const { asPath } = useRouter()
  const pageUrl = `${config.homepage}/${asPath}`
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
              <Link href={`/${config.collections.blog}`}>
                ← Alle Blog Einträge
              </Link>
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
        main={hydrate(body, { components })}
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
