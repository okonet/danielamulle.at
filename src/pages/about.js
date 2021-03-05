/* @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import Content, { title } from "../../content/sections/about.mdx"
import { aboutTheme } from "../theme"
import PageLayout from "../components/PageLayout"

export default () => {
  return (
    <PageLayout title={title} theme={aboutTheme}>
      <Content />
    </PageLayout>
  )
}
