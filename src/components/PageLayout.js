/* @jsx jsx */
import React from "react"
import { useLocation } from "@reach/router"
import { Container, jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/Section"
import OgImage from "../components/OgImage"
import CoverImage from "./CoverImage"

export default ({
  title,
  heading,
  coverImage,
  coverImageAuthor = "Andrey Okonetchnikov",
  coverImageLink = "https://okonet.ru",
  children,
  theme,
  blendMode = "screen",
  sx,
  ...props
}) => {
  const { search } = useLocation()
  if (search.includes("ogImage")) {
    return <OgImage title={title} coverImage={coverImage} />
  }
  if (coverImage) {
    return (
      <Layout theme={theme}>
        <SEO title={title} ogImage={true} />
        {coverImage && (
          <CoverImage
            fluid={coverImage.childImageSharp.fluid}
            author={coverImageAuthor}
            url={coverImageLink}
          />
        )}
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
          mt: -6,
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
