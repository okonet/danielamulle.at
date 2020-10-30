/* @jsx jsx */
import React from "react"
import { Container, Grid, jsx } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { blogTheme } from "../theme"
import PostCard from "./PostCard"
import Content, * as meta from "../../content/sections/blog.mdx"

const BlogPosts = ({ data }) => {
  const { posts } = data

  return (
    <Layout theme={blogTheme}>
      <SEO title={meta._frontmatter.title} />
      <Container>
        <Content />
      </Container>
      <Container variant={"full"}>
        <Grid gap={3} columns={[1, 2, 3]} sx={{ my: 4 }}>
          {posts.nodes.map((post) => (
            <PostCard {...post} key={post.id} />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default BlogPosts
