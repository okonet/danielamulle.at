import React from "react"
import Content, { title } from "../../content/sections/datenschutz.mdx"
import PageLayout from "../components/PageLayout"

function Datenschutz() {
  return (
    <PageLayout title={title} shouldShowSubscribe={false}>
      <Content />
    </PageLayout>
  )
}

export default Datenschutz
