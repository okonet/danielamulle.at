/* @jsx jsx */
import React from "react"
import { Grid, jsx } from "theme-ui"
import { blogTheme } from "../theme"
import PostCard from "./PostCard"
import PageLayout from "./PageLayout"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

const BlogPosts = ({ posts, post }) => {
  return (
    <PageLayout theme={blogTheme} title={post.title}>
      {hydrate(post.body, { components })}
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

export default BlogPosts
