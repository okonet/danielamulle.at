import React from "react"
import PageLayout from "./PageLayout"
import * as themes from "../theme"
import defaultTheme from "../theme"
import hydrate from "next-mdx-remote/hydrate"
import components from "./mdx-components"

export default function DefaultPage({ post, ...props }) {
  return (
    <PageLayout
      title={post.title}
      theme={themes[post.theme] || defaultTheme}
      {...props}
    >
      {hydrate(post.body, { components })}
    </PageLayout>
  )
}
