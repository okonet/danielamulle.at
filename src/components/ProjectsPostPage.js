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
  const tags = categories.filter((cat) => cat.isTag)
  return (
    <PageLayout
      theme={projectsTheme}
      title={title}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
      socialImage={socialImage}
      heading={
        <Box sx={{ mx: [0, 0, -4] }}>
          <Box
            as="nav"
            sx={{ color: "muted", fontSize: 0, gridColumn: [1, "1 / span 10"] }}
          >
            <Link to={project.slug}>← {project.id}</Link>
          </Box>
          <Styled.h1
            sx={{
              mt: 1,
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 10],
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
            my: 0,
            gridColumn: [1, 1, "11 / span 2"],
          }}
        >
          <Box
            sx={{
              "@media print": {
                display: "none",
              },
            }}
          >
            <Styled.h3>
              <InfoIcon width={17} sx={{ mr: 1, mb: -1 }} />
              Author
            </Styled.h3>
            <Styled.p>
              <Styled.a href={coverImageLink}>{coverImageAuthor}</Styled.a>
            </Styled.p>
          </Box>

          <TagList tags={tags} />

          <ShareButtons pageUrl={pageUrl} title={title} />
        </Box>
      </Grid>
    </PageLayout>
  )
}

export default ProjectsPostPage
