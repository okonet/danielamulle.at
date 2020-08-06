import React from "react"
import Content, * as content from "../../content/sections/offers.mdx"
import { offersTheme } from "../theme"
import PageLayout from "../components/PageLayout"

export default () => {
  return (
    <PageLayout title={content._frontmatter.title} theme={offersTheme}>
      <Content />
    </PageLayout>
  )
}
