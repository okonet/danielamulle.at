/* @jsx jsx */
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/Section"
import { Container, jsx, Styled } from "theme-ui"
import CoverImage from "./CoverImage"

export default ({
  title,
  heading,
  coverImage,
  children,
  theme,
  blendMode = "screen",
  sx,
  ...props
}) => {
  if (coverImage) {
    return (
      <Layout theme={theme}>
        <SEO title={title} />
        {coverImage}
        <Container variant="section">
          {heading ? (
            heading
          ) : (
            <Styled.h1
              sx={{
                variant: "textStyles.pageTitle",
              }}
            >
              {title}
            </Styled.h1>
          )}
          {children}
        </Container>
      </Layout>
    )
  }
  return (
    <Layout theme={theme}>
      <SEO title={title} />
      <Section
        theme={theme}
        blendMode={blendMode}
        sx={{
          display: "flex",
          pt: [6, 5],
          pb: [3, 5],
          backgroundColor: "headerBg",
          minHeight: [200, 280],
          alignItems: "flex-end",
          ...sx,
        }}
        {...props}
      >
        {heading ? (
          heading
        ) : (
          <Styled.h1
            sx={{
              variant: "textStyles.pageTitle",
            }}
          >
            {title}
          </Styled.h1>
        )}
      </Section>
      <Container variant="section">{children}</Container>
    </Layout>
  )
}
