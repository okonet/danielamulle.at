/** @jsx jsx */
import React from "react"
import { useRouter } from "next/router"
import { Box, jsx, Styled } from "theme-ui"
import { projectsTheme } from "../theme"
import InfoIcon from "./InfoIcon"
import ShareButtons from "./ShareButtons"
import PageLayout from "./PageLayout"
import PostTemplate from "./PostTemplate"
import config from "../../site.config"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

const ProjectsPostPage = ({ post }) => {
  const { asPath } = useRouter()
  const pageUrl = `${config.homepage}/${asPath}`

  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    socialImage,
    title,
    categories,
  } = post

  return (
    <PageLayout
      theme={projectsTheme}
      author={coverImageAuthor}
      title={title}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
      socialImage={socialImage}
      heading={
        <Box sx={{ mx: [0, 0, -4] }}>
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
            <Styled.h3>
              <InfoIcon width={17} sx={{ mr: 1, mb: -1 }} />
              Autorin
            </Styled.h3>
            <Styled.p>
              <Styled.a href={coverImageLink}>{coverImageAuthor}</Styled.a>
            </Styled.p>

            <ShareButtons pageUrl={pageUrl} title={title} />
          </>
        }
      />
    </PageLayout>
  )
}

export default ProjectsPostPage
