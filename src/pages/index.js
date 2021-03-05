/* @jsx jsx */
import * as React from "react"
import { Box, Flex, Grid, jsx, Styled, ThemeProvider } from "theme-ui"
import Home, { title } from "../../content/sections/home.mdx"
import { blogTheme, homeTheme, recipesTheme } from "../theme"
import PostCard from "../components/PostCard"
import Link from "../components/Link"
import { blogPath, recipesPath } from "../../paths"
import PageLayout from "../components/PageLayout"
import AboutBlock from "../components/AboutBlock"

const IndexPage = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     latestRecipes: allPost(
  //       filter: { collection: { eq: "recipes" } }
  //       limit: 3
  //       sort: { fields: [date], order: [DESC] }
  //     ) {
  //       nodes {
  //         ...PostMeta
  //       }
  //     }
  //     latestBlogPosts: allPost(
  //       filter: { collection: { eq: "posts" } }
  //       limit: 3
  //       sort: { fields: [date], order: [DESC] }
  //     ) {
  //       nodes {
  //         ...PostMeta
  //       }
  //     }
  //   }
  // `)
  return (
    <PageLayout theme={homeTheme} title={title}>
      <AboutBlock sx={{ mt: [0, -5] }}>
        <Home />
      </AboutBlock>

      {/*<ThemeProvider theme={recipesTheme}>*/}
      {/*  <Styled.h2>*/}
      {/*    Letzte{" "}*/}
      {/*    <Link to={`/${recipesPath}`} sx={{ color: "inherit" }}>*/}
      {/*      Rezepte*/}
      {/*    </Link>*/}
      {/*  </Styled.h2>*/}
      {/*  <Grid gap={3} columns={[1, 3]} sx={{ my: 3, mx: [0, 0, -4] }}>*/}
      {/*    {data.latestRecipes.nodes.map(({ slug, coverImage, title }) => (*/}
      {/*      <PostCard*/}
      {/*        key={slug}*/}
      {/*        slug={slug}*/}
      {/*        coverImage={coverImage}*/}
      {/*        title={title}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </Grid>*/}
      {/*</ThemeProvider>*/}

      {/*<ThemeProvider theme={blogTheme}>*/}
      {/*  <Styled.h2>*/}
      {/*    Aktuell im{" "}*/}
      {/*    <Link to={`/${blogPath}`} sx={{ color: "inherit" }}>*/}
      {/*      Blog*/}
      {/*    </Link>*/}
      {/*  </Styled.h2>*/}
      {/*  <Grid gap={3} columns={[1, 3]} sx={{ my: 3, mx: [0, 0, -4] }}>*/}
      {/*    {data.latestBlogPosts.nodes.map(({ slug, coverImage, title }) => (*/}
      {/*      <PostCard*/}
      {/*        key={slug}*/}
      {/*        slug={slug}*/}
      {/*        coverImage={coverImage}*/}
      {/*        title={title}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </Grid>*/}
      {/*</ThemeProvider>*/}
    </PageLayout>
  )
}

export default IndexPage
