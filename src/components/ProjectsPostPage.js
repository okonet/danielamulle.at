/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Grid, jsx, Styled } from "theme-ui"
import Link from "./Link"
import { projectsTheme } from "../theme"
import InfoIcon from "./InfoIcon"
import ShareButtons from "./ShareButtons"
import TagList from "./TagList"
import PageLayout from "./PageLayout"
import PostTemplate from "./PostTemplate"

const ProjectsPostPage = ({ data, location }) => {
  const { post, site } = data
  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    socialImage,
    title,
    categories,
  } = post

  const project = categories[0]
  const pageUrl = location.href ? location.href : site.siteMetadata.url

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
            <Link to={project.slug}>← {project.id}</Link>
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
