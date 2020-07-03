import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Focus from "../../content/sections/focus.mdx"
import Section from "../components/Section"
import { whatTheme } from "../theme"

export default () => {
  return (
    <Layout theme={whatTheme}>
      <SEO title="Angebot" />
      <Section theme={whatTheme}>
        <Focus />
      </Section>
    </Layout>
  )
}
