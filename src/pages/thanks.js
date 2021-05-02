import React from "react"
import PageLayout from "../components/PageLayout"
import { getPostBySlug } from "./api/posts"
import renderToString from "next-mdx-remote/render-to-string"
import components from "../gatsby-plugin-theme-ui/components"
import smartypants from "@silvenon/remark-smartypants"
import hydrate from "next-mdx-remote/hydrate"

export async function getStaticProps({ params, locale }) {
  const post = getPostBySlug("sections", "thanks")

  const mdxSource = await renderToString(post.content, {
    components,
    mdxOptions: {
      remarkPlugins: [smartypants],
    },
  })

  return {
    props: {
      content: mdxSource,
    },
  }
}

export default function ThanksPage({ content }) {
  return (
    <PageLayout shouldShowSubscribe={false}>
      {hydrate(content, { components })}
    </PageLayout>
  )
}
