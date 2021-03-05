/* @jsx jsx */
import React from "react"
import { Grid, jsx } from "theme-ui"
import { blogTheme } from "../theme"
import PostCard from "./PostCard"
import Content, { title } from "../../content/sections/blog.mdx"
import PageLayout from "./PageLayout"

const BlogPosts = ({ data }) => {
  const { posts } = data

  return (
    <PageLayout theme={blogTheme} title={title}>
      <Content />
      <Grid
        gap={3}
        columns={[1, 2, 3]}
        sx={{ my: 4, mx: [0, 0, -5], px: [0, 0, 2] }}
      >
        {posts.nodes.map((post) => (
          <PostCard {...post} key={post.id} />
        ))}
      </Grid>
    </PageLayout>
  )
}

export default BlogPosts
