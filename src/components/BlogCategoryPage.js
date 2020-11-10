/* @jsx jsx */
import React from "react"
import { Box, Container, Grid, jsx, Styled, Text } from "theme-ui"
import Link from "../components/Link"
import { blogTheme } from "../theme"
import { blogPath } from "../../paths"
import Group from "react-group"
import PageLayout from "./PageLayout"
import PostCard from "./PostCard"

export default ({ data }) => {
  const { category } = data
  return (
    <PageLayout
      theme={blogTheme}
      title={`Blog: ${category.id}`}
      heading={
        <>
          <Box as="nav">
            <Group separator=" / ">
              <Link to={`/${blogPath}`}>Blog</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              ":first-letter": { textTransform: "uppercase" },
            }}
          >
            {category.id}
          </Styled.h1>
        </>
      }
    >
      {category.postCount > 0 ? (
        <Grid
          gap={3}
          columns={[1, 2, 3]}
          sx={{ my: 4, mx: [0, 0, -5], px: [0, 0, 2] }}
        >
          {category.posts.map((post) => (
            <PostCard {...post} key={post.id} />
          ))}
        </Grid>
      ) : (
        <Container>
          <Text as="p" sx={{ variant: "textStyles.lead", color: "secondary" }}>
            Keine Rezepte für diese Kategorie gefunden.{" "}
            <Link to={`/${blogPath}`}>Alle Einträge</Link>.
          </Text>
        </Container>
      )}
    </PageLayout>
  )
}
