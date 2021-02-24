import React from "react"
import * as Content from "../../content/sections/thanks.mdx"
import PageLayout from "../components/PageLayout"

export default function ThanksPage() {
  return (
    <PageLayout shouldShowSubscribe={false}>
      <Content.default />
    </PageLayout>
  )
}
