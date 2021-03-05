import React from "react"
import Content, { title } from "../../content/sections/offers.mdx"
import { offersTheme } from "../theme"
import PageLayout from "../components/PageLayout"

export default () => {
  return (
    <PageLayout title={title} theme={offersTheme}>
      <Content />
    </PageLayout>
  )
}
