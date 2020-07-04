import React from "react"
import Content, * as content from "../../content/sections/focus.mdx"
import { whatTheme } from "../theme"
import PageLayout from "../components/PageLayout"

export default () => {
  return (
    <PageLayout title={content._frontmatter.title} theme={whatTheme}>
      <Content />
    </PageLayout>
  )
}
