/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import { getAllPosts, getPostBySlug } from "../api/posts"
import config from "../../../site.config"
import components from "../../gatsby-plugin-theme-ui/components"
import BlogPostPage from "../../components/BlogPostPage"

export async function getStaticProps({ params }) {
  const { slug } = params
  const post = getPostBySlug(config.collections.blog, slug)

  if (!post) {
    return {
      notFound: true, // TODO: Remove in favor of fallback: true
    }
  }

  const mdxSource = await renderToString(post.content, { components })
  return {
    props: {
      ...post,
      body: mdxSource,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = getAllPosts(config.collections.blog)
  return {
    paths: allPosts.map((post) => {
      const [_, slug] = post.slug.split("/")
      return {
        params: { slug },
      }
    }),
    fallback: false,
  }
}

function BlogPost(props) {
  return <BlogPostPage data={{ post: props }} />
}

export default BlogPost
