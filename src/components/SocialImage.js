import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { AspectRatio, Flex, Text, ThemeProvider } from "theme-ui"
import { transparentize } from "@theme-ui/color"
import theme, { palette } from "../theme"

export default function ({ image, title, width = "100vw", height = "100vh" }) {
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
    return `linear-gradient(135deg,
            ${transparentize("cyan.4", 0)(theme)},
            ${transparentize("beige.5", 0)(theme)},
            ${transparentize("pink.5", 0)(theme)}
        )`
  }

  const ogTheme = {
    ...theme,
    space: [0, "2rem", "3rem", "4rem", "5rem"],
    fontSizes: ["1.25rem", "3rem", "5rem", "7rem", "9rem"],
    colors: {
      ...palette,
      text: "white",
      secondary: "white",
    },
  }
  return (
    <ThemeProvider theme={ogTheme}>
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
          }}
        >
          <Img
            loading="eager"
            fadeIn={false}
            fixed={logo.childImageSharp.fixed}
            alt="Logo"
          />
          {title && (
            <Text
              as="h1"
              sx={{
                position: "relative",
                fontSize: 2,
                lineHeight: 1.125,
                background: gradient,
                "-webkitBackgroundClip": "text",
                "-webkitTextFillColor": "transparent",
                mixBlendMode: "hard-light",
              }}
            >
              {title}
            </Text>
          )}
        </Flex>
      </AspectRatio>
    </ThemeProvider>
  )
}
