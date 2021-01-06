/* @jsx jsx */
import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { AspectRatio, Box, Flex, Styled, jsx } from "theme-ui"
import { transparentize } from "@theme-ui/color"
import ThemeUIProvider from "./ThemeUIProvider"
import theme, { palette } from "../theme"

export default function ({
  image,
  title,
  author,
  width = "100vw",
  height = "100vh",
}) {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo@2x.png" }) {
        childImageSharp {
          fixed(width: 256) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const gradient = () => (theme) => {
    return `linear-gradient(
            ${transparentize("text", 1)(theme)} 30%, 
            ${transparentize("text", 0)(theme)}
        )`
  }

  const ogTheme = {
    ...theme,
    space: [0, "2rem", "3rem", "4rem", "5rem"],
    fontSizes: ["1.5rem", "2rem", "2.5rem", "3rem", "3rem", "4rem"],
  }
  return (
    <ThemeUIProvider theme={ogTheme}>
      <AspectRatio ratio={width / height} sx={{ width, height }}>
        <Img
          alt={title}
          loading="eager"
          fadeIn={false}
          fixed={image.childImageSharp.fixed}
          style={{ width: "100%", height: "100%" }}
        />

        <Flex
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            flexDirection: "column",
            justifyContent: "space-between",
            py: 1,
            px: 2,
            width: "100%",
            height: "100%",
            backgroundImage: title ? gradient : "none",
          }}
        >
          <Img
            loading="eager"
            fadeIn={false}
            fixed={logo.childImageSharp.fixed}
            alt="Logo"
          />
          <Box sx={{}}>
            {title && (
              <Styled.h1
                sx={{
                  variant: "textStyles.pageTitle",
                  color: "background",
                }}
              >
                {title}
              </Styled.h1>
            )}
            {author && (
              <Styled.h2
                sx={{
                  m: 0,
                  variant: "textStyles.cardTitle",
                  color: "background",
                  fontWeight: "normal",
                  opacity: 0.65,
                }}
              >
                von {author}
              </Styled.h2>
            )}
          </Box>
        </Flex>
      </AspectRatio>
    </ThemeUIProvider>
  )
}
