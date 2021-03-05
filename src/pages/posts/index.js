import React from "react"
import PageLayout from "../../components/PageLayout"
import Content, { title } from "../../../content/sections/blog.mdx"
import { blogTheme } from "../../theme"
import { getAllPosts } from "../api/posts"
import config from "../../../site.config"
import PostCard from "../../components/PostCard"
import { Grid } from "theme-ui"

export async function getStaticProps({ params }) {
  const posts = getAllPosts(config.collections.blog)

  return {
    props: {
      posts,
    },
  }
}

function BlogIndex({ posts }) {
  return (
    <PageLayout title={title} theme={blogTheme}>
      <Content />
      <Grid
        gap={3}
        columns={[1, 2, 3]}
        sx={{ my: 4, mx: [0, 0, -5], px: [0, 0, 2] }}
      >
        {posts.map((post) => (
          <PostCard {...post} key={post.slug} />
        ))}
      </Grid>
    </PageLayout>
  )
}

export default BlogIndex
