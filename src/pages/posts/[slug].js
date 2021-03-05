/* @jsx jsx */
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import hydrate from "next-mdx-remote/hydrate"
import { jsx } from "theme-ui"
import PageLayout from "../../components/PageLayout"
import { blogTheme } from "../../theme"
import { getAllPosts, getPostBySlug } from "../api/posts"
import components from "../../gatsby-plugin-theme-ui/components"
import config from "../../../site.config"

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
      source: mdxSource,
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

function BlogPost({ title, source }) {
  const content = hydrate(source, { components })

  return (
    <PageLayout title={title} theme={blogTheme}>
      {content}
    </PageLayout>
  )
}

export default BlogPost
