/* @jsx jsx */
import React from "react"
import Content, * as content from "../../content/sections/about.mdx"
import { aboutTheme } from "../theme"
import { jsx } from "theme-ui"
import PageLayout from "../components/PageLayout"

export default () => {
  return (
    <PageLayout title={content._frontmatter.title} theme={aboutTheme}>
      <Content />
    </PageLayout>
  )
}
