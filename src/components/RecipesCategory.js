/* @jsx jsx */
import React from "react"
import { Box, Container, Grid, jsx, Styled, Text } from "theme-ui"
import Link from "../components/Link"
import { recipesTheme } from "../theme"
import { recipesPath } from "../../paths"
import Group from "react-group"
import PageLayout from "./PageLayout"
import PostCard from "./PostCard"

export default ({ category, posts }) => {
  return (
    <PageLayout
      theme={recipesTheme}
      title={`Rezepte: ${category.id}`}
      heading={
        <>
          <Box as="nav">
            <Group separator=" / ">
              <Link to={`/${recipesPath}`}>Alle Rezepte</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              variant: "textStyles.pageTitle",
            }}
          >
            {category.id}
          </Styled.h1>
        </>
      }
    >
      {category.postCount > 0 ? (
        <Grid
          as="ol"
          gap={[2, 1, 2]}
          columns={[2, 3]}
          sx={{ p: 0, mt: 3, mb: 4, mx: [0, 0, -5], px: [0, 0, 2] }}
        >
          {posts.map((post) => (
            <Box as="li" sx={{ m: 0, p: 0, listStyle: "none" }}>
              <PostCard {...post} key={post.slug} />
            </Box>
          ))}
        </Grid>
      ) : (
        <Container>
          <Text as="p" sx={{ variant: "textStyles.lead", color: "secondary" }}>
            Keine Rezepte für diese Kategorie gefunden.{" "}
            <Link to={`/${recipesPath}`}>Alle Rezepte</Link>.
          </Text>
        </Container>
      )}
    </PageLayout>
  )
}
