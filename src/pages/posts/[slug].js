/* @jsx jsx */
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import hydrate from "next-mdx-remote/hydrate"
import { jsx } from "theme-ui"
import PageLayout from "../../components/PageLayout"
import { blogTheme } from "../../theme"
import { getAllPosts, getCollectionPath, getDocBySlug } from "../api/posts"
import components from "../../gatsby-plugin-theme-ui/components"
import config from "../../../site.config"

export async function getStaticProps({ params }) {
  const { slug } = params
  const post = getDocBySlug(getCollectionPath(config.collections.blog), slug)
  if (!post) {
    return {
      notFound: true,
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
  return {
    paths: getAllPosts(getCollectionPath(config.collections.blog)).map(
      (post) => ({
        params: { slug: post.slug },
      })
    ),
    fallback: false,
  }
}

function BlogPost({ meta, source }) {
  const content = hydrate(source, { components })
  return (
    <PageLayout title={meta.title} theme={blogTheme}>
      {content}
    </PageLayout>
  )
}

export default BlogPost
