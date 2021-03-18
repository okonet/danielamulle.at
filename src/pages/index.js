/* @jsx jsx */
import * as React from "react"
import { Grid, jsx, Styled, ThemeProvider } from "theme-ui"
import { take } from "lodash"
import Home, { title } from "../../public/content/sections/home.mdx"
import { blogTheme, homeTheme, recipesTheme } from "../theme"
import PostCard from "../components/PostCard"
import Link from "../components/Link"
import { blogPath, recipesPath } from "../../paths"
import PageLayout from "../components/PageLayout"
import AboutBlock from "../components/AboutBlock"
import { getAllPostsAndCategories } from "./api/posts"
import config from "../../site.config"

export async function getStaticProps() {
  const [recipes] = getAllPostsAndCategories(config.collections.recipes)
  const [posts] = getAllPostsAndCategories(config.collections.blog)

  return {
    props: {
      latestRecipes: take(recipes, 3),
      latestPosts: take(posts, 3),
    },
  }
}

export default function IndexPage({ latestRecipes, latestPosts }) {
  return (
    <PageLayout theme={homeTheme} title={title}>
      <AboutBlock sx={{ mt: [0, -5] }}>
        <Home />
      </AboutBlock>

      <ThemeProvider theme={recipesTheme}>
        <Styled.h2>
          Letzte{" "}
          <Link to={`/${recipesPath}`} sx={{ color: "inherit" }}>
            Rezepte
          </Link>
        </Styled.h2>
        <Grid gap={3} columns={[1, 3]} sx={{ my: 3, mx: [0, 0, -4] }}>
          {latestRecipes.map(({ slug, coverImage, title }) => (
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
          {latestPosts.map(({ slug, coverImage, title }) => (
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
