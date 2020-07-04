import React from "react"
import * as Content from "../../content/sections/impressum.mdx"
import PageLayout from "../components/PageLayout"

function Impressum() {
  return (
    <PageLayout title={Content._frontmatter.title}>
      <Content.default />
    </PageLayout>
  )
}

export default Impressum
