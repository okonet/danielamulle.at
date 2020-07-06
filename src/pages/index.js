/* @jsx jsx */
import React from "react"
import {
  Box,
  Container,
  Flex,
  Grid,
  jsx,
  Styled,
  ThemeProvider,
} from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Home from "../../content/sections/home.mdx"
import { blogTheme, homeTheme, recipesTheme } from "../theme"
import SEO from "../components/seo"
import Layout from "../components/layout"
import RecipeCard from "../components/RecipeCard"
import Link from "../components/Link"
import { blogPath, recipesPath } from "../../paths"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      latestRecipes: allRecipe(
        limit: 3
        sort: { fields: [date], order: [DESC] }
      ) {
        nodes {
          ...RecipeMeta
        }
      }
      latestBlogPosts: allBlogPost(
        limit: 3
        sort: { fields: [date], order: [DESC] }
      ) {
        nodes {
          ...BlogPostMeta
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
  console.log(data)
  return (
    <Layout theme={homeTheme}>
      <SEO title={"Wilkommen"} />
      <Container
        variant="section"
        sx={{
          mt: [0, 0, 0],
        }}
      >
        <Flex
          sx={{
            flexDirection: ["column", "row"],
            alignItems: "center",
            "& h1": {
              textAlign: ["center", "left"],
            },
          }}
        >
          <Flex
            sx={{
              order: [0, 1],
              flex: "0 1 auto",
              alignItems: "flex-start",
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
                sx={{ width: "100%" }}
              />
            </Box>
          </Flex>
          <Box
            sx={{
              display: "block",
              flex: 1,
              "& > p:first-of-type": {
                variant: "textStyles.lead",
              },
            }}
          >
            <Home />
          </Box>
        </Flex>
      </Container>

      <ThemeProvider theme={recipesTheme}>
        <Container sx={{ mt: 4 }}>
          <Styled.h2>
            Letzte{" "}
            <Link to={recipesPath} sx={{ color: "inherit" }}>
              Rezepte
            </Link>
          </Styled.h2>
        </Container>
        <Container variant="full">
          <Grid gap={3} columns={[1, 3]} sx={{ my: 3 }}>
            {data.latestRecipes.nodes.map(({ slug, coverImage, title }) => (
              <RecipeCard slug={slug} coverImage={coverImage} title={title} />
            ))}
          </Grid>
        </Container>
      </ThemeProvider>

      <ThemeProvider theme={blogTheme}>
        <Container sx={{ mt: 4 }}>
          <Styled.h2>
            Aktuell im{" "}
            <Link to={blogPath} sx={{ color: "inherit" }}>
              Blog
            </Link>
          </Styled.h2>
        </Container>
        <Container variant="full">
          <Grid gap={3} columns={[1, 3]} sx={{ my: 3 }}>
            {data.latestBlogPosts.nodes.map(({ slug, coverImage, title }) => (
              <RecipeCard slug={slug} coverImage={coverImage} title={title} />
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </Layout>
  )
}

export default IndexPage
