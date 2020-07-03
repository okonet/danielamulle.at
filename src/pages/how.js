/* @jsx jsx */
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Content, * as content from "../../content/sections/how.mdx"
import Section from "../components/Section"
import { howTheme } from "../theme"
import { Container, jsx, Styled } from "theme-ui"

export default () => {
  return (
    <Layout theme={howTheme}>
      <SEO title={content._frontmatter.title} />
      <Section
        theme={howTheme}
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
        <Content />
      </Container>
    </Layout>
  )
}
