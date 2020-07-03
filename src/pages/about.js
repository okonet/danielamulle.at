/* @jsx jsx */
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About, * as content from "../../content/sections/about.mdx"
import Section from "../components/Section"
import { aboutTheme } from "../theme"
import { Container, jsx, Styled } from "theme-ui"

console.log(content)

export default () => {
  return (
    <Layout theme={aboutTheme}>
      <SEO title={content._frontmatter.title} />
      <Section theme={aboutTheme}>
        <Styled.h1>{content._frontmatter.title}</Styled.h1>
      </Section>
      <Container
        variant="full"
        sx={{
          px: 4,
          pl: [4, 5],
          py: 4,
          mt: -5,
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
