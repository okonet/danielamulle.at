/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import Layout from "./layout"
import Link from "./Link"
import { projectsTheme } from "../theme"
import SEO from "./seo"
import CoverImage from "./CoverImage"
import InfoIcon from "./InfoIcon"
import TagIcon from "./TagIcon"
import Group from "react-group"
import Tag from "./Tag"
import ShareButtons from "./ShareButtons"
import TagList from "./TagList"

const ProjectsPostPage = ({ data, pageContext, location }) => {
  const { post, site } = data
  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    title,
    categories,
  } = post

  const project = categories[0]
  const pageUrl = location.href ? location.href : site.siteMetadata.url
  const tags = categories.filter((cat) => cat.isTag)
  return (
    <Layout theme={projectsTheme}>
      <SEO title={title} ogImage={pageContext.ogImage} />
      <CoverImage
        fluid={coverImage.childImageSharp.fluid}
        author={coverImageAuthor}
        url={coverImageLink}
      />
      <Container variant="section">
        <Grid gap={4} columns={[1, 12]}>
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
              gridColumn: [1, "10 / span 3"],
              gridRow: [4, "3 / span 2"],
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
      </Container>
    </Layout>
  )
}

export default ProjectsPostPage
