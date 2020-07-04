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
  blendMode = "color-burn",
  sx,
  ...props
}) => {
  return (
    <Layout theme={theme}>
      <SEO title={title} />
      <Section
        theme={theme}
        blendMode={blendMode}
        sx={{ minHeight: [240, 320], pt: 6, ...sx }}
        {...props}
      >
        <Styled.h1>{title}</Styled.h1>
      </Section>
      <Container
        variant="full"
        sx={{
          py: [3, 4],
          px: [3, 3, 88],
          mt: -4,
          bg: "white",
          borderRadius: ["none", "none", "medium"],
          zIndex: 1,
        }}
      >
        {children}
      </Container>
    </Layout>
  )
}
