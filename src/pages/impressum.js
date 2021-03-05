import React from "react"
import Content, { title } from "../../content/sections/impressum.mdx"
import PageLayout from "../components/PageLayout"

function Impressum() {
  return (
    <PageLayout title={title} shouldShowSubscribe={false}>
      <Content />
    </PageLayout>
  )
}

export default Impressum
