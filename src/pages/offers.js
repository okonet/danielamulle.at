/* @jsx jsx */
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Content, * as content from "../../content/sections/focus.mdx"
import Section from "../components/Section"
import { whatTheme } from "../theme"
import { Container, jsx, Styled } from "theme-ui"

export default () => {
  return (
    <Layout theme={whatTheme}>
      <SEO title={content._frontmatter.title} />
      <Section
        theme={whatTheme}
        blendMode="color-burn"
        sx={{ minHeight: 320, pt: 6 }}
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
