import React from "react"
import { Container } from "theme-ui"
import * as Content from "../../content/sections/datenschutz.mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Impressum() {
  return (
    <Layout>
      <SEO title={Content._frontmatter.title} />
      <Container>
        <Content.default />
      </Container>
    </Layout>
  )
}

export default Impressum
