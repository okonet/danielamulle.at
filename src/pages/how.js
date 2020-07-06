import React from "react"
import Content, * as content from "../../content/sections/how.mdx"
import { howTheme } from "../theme"
import PageLayout from "../components/PageLayout"

export default () => {
  return (
    <PageLayout title={content._frontmatter.title} theme={howTheme}>
      <Content />
    </PageLayout>
  )
}
