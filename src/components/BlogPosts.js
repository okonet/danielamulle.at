/* @jsx jsx */
import React from "react"
import { Container, Grid, jsx } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { blogTheme } from "../theme"
import PostCard from "./PostCard"
import Content, * as meta from "../../content/sections/blog.mdx"
import PageLayout from "./PageLayout"

const BlogPosts = ({ data }) => {
  const { posts } = data

  return (
    <PageLayout theme={blogTheme} title={meta._frontmatter.title}>
      <Content />
      <Grid gap={3} columns={[1, 2, 3]} sx={{ my: 4 }}>
        {posts.nodes.map((post) => (
          <PostCard {...post} key={post.id} />
        ))}
      </Grid>
    </PageLayout>
  )
}

export default BlogPosts
