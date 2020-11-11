/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Grid, jsx, Styled } from "theme-ui"
import Group from "react-group"
import Link from "./Link"
import { recipesTheme } from "../theme"
import { recipesPath } from "../../paths"
import SEO from "./seo"
import InfoIcon from "./InfoIcon"
import ClockIcon from "./ClockIcon"
import ShareButtons from "./ShareButtons"
import TagList from "./TagList"
import PageLayout from "./PageLayout"

export default ({ data, pageContext, location }) => {
  const { post, site } = data
  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    title,
    categories,
    timeToCook,
  } = post
  const pageUrl = location.href ? location.href : site.siteMetadata.url
  const mainCategory = categories.find((cat) => !cat.isTag)
  const tags = categories.filter((cat) => cat.isTag)
  return (
    <PageLayout
      theme={recipesTheme}
      title={title}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
      heading={
        <Box sx={{ mx: [0, 0, -4] }}>
          <Box
            as="nav"
            sx={{
              color: "muted",
              fontSize: 0,
              gridColumn: [1, "1 / span 10"],
              "@media print": {
                visibility: "hidden",
              },
            }}
          >
            <Group separator=" → ">
              <Link to={`/${recipesPath}`}>Alle Rezepte</Link>
              <Link to={mainCategory.slug}>{mainCategory.id}</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              mt: 1,
              gridColumn: [1, "1 / span 10"],
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
          }}
        >
          <Styled.h3>
            <ClockIcon width={17} sx={{ mr: 1, mb: -1 }} />
            Zubereitungszeit
          </Styled.h3>
          <Styled.p>{timeToCook}</Styled.p>

          <TagList tags={tags} />

          <Box
            sx={{
              "@media print": {
                display: "none",
              },
            }}
          >
            <Styled.h3>
              <InfoIcon width={17} sx={{ mr: 1, mb: -1 }} />
              Nährwerte
            </Styled.h3>
            <Styled.p>
              Du suchst die Nährwertangaben? In{" "}
              <Link to="/posts/2020-07-07-nährwertangaben">diesem Artikel</Link>{" "}
              erklärte ich, warum du hier keine findest.
            </Styled.p>
          </Box>

          <ShareButtons pageUrl={pageUrl} title={title} />
        </Box>
      </Grid>
    </PageLayout>
  )
}
