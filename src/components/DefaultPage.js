import React from "react"
import PageLayout from "./PageLayout"
import * as themes from "../theme"
import defaultTheme from "../theme"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

export default function DefaultPage(props) {
  const post = props.section
  return (
    <PageLayout title={post.title} theme={themes[post.theme] || defaultTheme}>
      {hydrate(post.body, { components })}
    </PageLayout>
  )
}
