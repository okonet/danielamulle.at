import React from "react"
import * as Content from "../../content/sections/datenschutz.mdx"
import PageLayout from "../components/PageLayout"

function Impressum() {
  return (
    <PageLayout title={Content._frontmatter.title} shouldShowSubscribe={false}>
      <Content.default />
    </PageLayout>
  )
}

export default Impressum
