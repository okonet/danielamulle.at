import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import { AspectRatio, Box, Flex, Text, ThemeProvider } from "theme-ui"
import { transparentize } from "@theme-ui/color"
import theme, { palette } from "../theme"

export default function({
  coverImage,
  title,
  width = "100vw",
  height = "100vh",
}) {
  const { site, logo } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          role
          socialHandle
        }
      }
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
    return `linear-gradient(45deg,
            ${transparentize("cyan.3", 0.25)(theme)},
            ${transparentize("beige.4", 0.75)(theme)}
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
      <AspectRatio
        ratio={width / height}
        sx={{
          width,
          height,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${coverImage.childImageSharp.fluid.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
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
            width,
            height,
            backgroundImage: gradient,
          }}
        >
          <Img
            loading="eager"
            fadeIn={false}
            fixed={logo.childImageSharp.fixed}
            alt="Logo"
          />
          <Text
            sx={{
              variant: "textStyles.sectionTitle",
              fontSize: 2,
              lineHeight: 1.125,
            }}
          >
            {title}
          </Text>
        </Flex>
      </AspectRatio>
    </ThemeProvider>
  )
}
