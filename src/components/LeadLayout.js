/* @jsx jsx */
import React from "react"
import { useLocation } from "@reach/router"
import { Box, Flex, jsx, Styled } from "theme-ui"
import SEO from "../components/seo"
import SocialImage from "./SocialImage"
import CoverImage from "./CoverImage"
import Footer from "./Footer"
import ThemeUIProvider from "./ThemeUIProvider"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

export default function LeadLayout({
  author,
  title,
  subtitle,
  socialImage,
  coverImage,
  coverImageAuthor,
  coverImageLink,
  children,
  theme = {},
}) {
  const { search } = useLocation()
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo@2x.png" }) {
        childImageSharp {
          fixed(width: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  if (search.includes("ogImage")) {
    return (
      <SocialImage
        author={author}
        title={title}
        image={socialImage}
        width={1012}
        height={506}
      />
    )
  }
  if (search.includes("instagramWithTitle")) {
    return (
      <SocialImage
        author={author}
        title={title}
        image={socialImage}
        width={1080}
        height={1080}
      />
    )
  }
  if (search.includes("instagram")) {
    return (
      <SocialImage
        title={null}
        image={socialImage}
        width={1080}
        height={1080}
      />
    )
  }

  return (
    <>
      <SEO title={title} ogImage={!!coverImage} />
      <ThemeUIProvider theme={theme}>
        <Flex
          sx={{ flexDirection: "column", minHeight: "100vh", bg: "background" }}
        >
          <Flex
            as="main"
            sx={{
              flexDirection: "column",
              flexGrow: 1,
              bg: "background",
            }}
          >
            <CoverImage
              fluid={coverImage.childImageSharp.fluid}
              author={coverImageAuthor}
              url={coverImageLink}
            >
              <Flex
                sx={{
                  flexGrow: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Img
                  loading="eager"
                  fadeIn={false}
                  fixed={logo.childImageSharp.fixed}
                  alt="Logo"
                />
                <Box sx={{ "* + *": { mt: 4 } }}>
                  <Styled.h1
                    sx={{
                      variant: "textStyles.pageTitle",
                      textAlign: "center",
                      color: "background",
                    }}
                  >
                    {title}
                  </Styled.h1>
                  {subtitle && (
                    <Styled.h2
                      sx={{
                        variant: "textStyles.subTitle",
                        textAlign: "center",
                        color: "background",
                      }}
                    >
                      {subtitle}
                    </Styled.h2>
                  )}
                </Box>
              </Flex>
            </CoverImage>

            {children}
          </Flex>

          <Footer />
        </Flex>
      </ThemeUIProvider>
    </>
  )
}
