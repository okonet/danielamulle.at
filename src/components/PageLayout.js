/* @jsx jsx */
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/Section"
import { Container, jsx, Styled } from "theme-ui"

export default ({
  title,
  children,
  theme,
  blendMode = "multiply",
  sx,
  ...props
}) => {
  return (
    <Layout theme={theme}>
      <SEO title={title} />
      {title && (
        <Section
          theme={theme}
          blendMode={blendMode}
          sx={{ pt: 6, pb: [3, 5], ...sx }}
          {...props}
        >
          <Styled.h1 sx={{ color: "background" }}>{title}</Styled.h1>
        </Section>
      )}
      <Container variant="section">{children}</Container>
    </Layout>
  )
}
