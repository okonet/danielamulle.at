/* @jsx jsx */
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About, * as content from "../../content/sections/about.mdx"
import Section from "../components/Section"
import { aboutTheme } from "../theme"
import { Container, jsx, Styled } from "theme-ui"

export default () => {
  return (
    <Layout theme={aboutTheme}>
      <SEO title={content._frontmatter.title} />
      <Section
        theme={aboutTheme}
        blendMode="color-burn"
        sx={{ minHeight: 320, display: "flex", alignItems: "center" }}
      >
        <Styled.h1>{content._frontmatter.title}</Styled.h1>
      </Section>
      <Container
        variant="full"
        sx={{
          py: 4,
          px: 88,
          mt: -4,
          bg: "white",
          borderRadius: ["none", "none", "medium"],
          zIndex: 1,
        }}
      >
        <About />
      </Container>
    </Layout>
  )
}
