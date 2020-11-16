/* @jsx jsx */
import * as React from "react"
import { Box, Flex, Grid, jsx, Styled, ThemeProvider } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Home, { _frontmatter } from "../../content/sections/home.mdx"
import { blogTheme, homeTheme, recipesTheme } from "../theme"
import PostCard from "../components/PostCard"
import Link from "../components/Link"
import { blogPath, recipesPath } from "../../paths"
import PageLayout from "../components/PageLayout"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      latestRecipes: allPost(
        filter: { collection: { eq: "recipes" } }
        limit: 3
        sort: { fields: [date], order: [DESC] }
      ) {
        nodes {
          ...PostMeta
        }
      }
      latestBlogPosts: allPost(
        filter: { collection: { eq: "posts" } }
        limit: 3
        sort: { fields: [date], order: [DESC] }
      ) {
        nodes {
          ...PostMeta
        }
      }
      portraitImage: file(relativePath: { eq: "portrait.png" }) {
        childImageSharp {
          resize(width: 400, quality: 100) {
            src
          }
        }
      }
    }
  `)
  return (
    <PageLayout
      theme={homeTheme}
      heading={
        <Styled.h1 sx={{ my: 0, mb: -4 }}>{_frontmatter.title}</Styled.h1>
      }
    >
      <Flex
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["center", "flex-end"],
          h1: {
            textAlign: ["center", "left"],
          },
        }}
      >
        <Flex
          sx={{
            order: [0, 1],
            flex: "0 1 auto",
            mr: [0, 4],
          }}
        >
          <Box
            sx={{
              width: [150, 300],
              height: [150, "auto"],
              borderRadius: ["round", "none"],
              overflow: "hidden",
              objectFit: "cover",
            }}
          >
            <img
              src={data.portraitImage.childImageSharp.resize.src}
              alt="Portrait von Daniela Mulle"
              sx={{ width: "100%", verticalAlign: "top" }}
            />
          </Box>
        </Flex>
        <Box
          sx={{
            display: "block",
            mt: -4,
            pb: 4,
            flex: 1,
            "& > p:first-of-type": {
              variant: "textStyles.lead",
            },
          }}
        >
          <Home />
        </Box>
      </Flex>

      <ThemeProvider theme={recipesTheme}>
        <Styled.h2>
          Letzte{" "}
          <Link to={`/${recipesPath}`} sx={{ color: "inherit" }}>
            Rezepte
          </Link>
        </Styled.h2>
        <Grid gap={3} columns={[1, 3]} sx={{ my: 3, mx: [0, 0, -4] }}>
          {data.latestRecipes.nodes.map(({ slug, coverImage, title }) => (
            <PostCard
              key={slug}
              slug={slug}
              coverImage={coverImage}
              title={title}
            />
          ))}
        </Grid>
      </ThemeProvider>

      <ThemeProvider theme={blogTheme}>
        <Styled.h2>
          Aktuell im{" "}
          <Link to={`/${blogPath}`} sx={{ color: "inherit" }}>
            Blog
          </Link>
        </Styled.h2>
        <Grid gap={3} columns={[1, 3]} sx={{ my: 3, mx: [0, 0, -4] }}>
          {data.latestBlogPosts.nodes.map(({ slug, coverImage, title }) => (
            <PostCard
              key={slug}
              slug={slug}
              coverImage={coverImage}
              title={title}
            />
          ))}
        </Grid>
      </ThemeProvider>
    </PageLayout>
  )
}

export default IndexPage
