import React from "react"
import Link from "./Link"
import Img from "gatsby-image"
import { Box, Flex, Text, ThemeProvider } from "theme-ui"
import { transparentize } from "@theme-ui/color"
import theme, { palette } from "../theme"
import { graphql, useStaticQuery } from "gatsby"

function Logo() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          role
        }
      }
      image: file(relativePath: { eq: "logo@2x.png" }) {
        childImageSharp {
          fixed(width: 128) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Img
        loading="eager"
        fadeIn={false}
        fixed={data.image.childImageSharp.fixed}
        alt="Logo"
      />
      <Box sx={{ ml: 1 }}>
        <Text
          as="p"
          sx={{
            m: 0,
            color: "secondary",
            fontFamily: "monospace",
            fontSize: 0,
            lineHeight: 1,
          }}
        >
          {data.site.siteMetadata.role}
        </Text>
        <Text
          as="h1"
          sx={{
            m: 0,
            color: "text",
            fontFamily: "body",
            fontWeight: "heading",
            lineHeight: 1,
            fontSize: 2,
          }}
        >
          {data.site.siteMetadata.author}
        </Text>
      </Box>
    </Box>
  )
}

export default function({ coverImage, slug, title, ...props }) {
  const gradient = () => (theme) => {
    return `linear-gradient(45deg,
            ${transparentize("teal.3", 0.5)(theme)}, 
            ${transparentize("orange.2", 0.5)(theme)} 
        )`
  }

  const ogTheme = {
    ...theme,
    space: [0, "2vmin", "3vmin", "4vmin", "5vmin"],
    fontSizes: ["3vmin", "4vmin", "8vmin", "4vmin", "5vmin"],
    colors: {
      ...palette,
    },
  }
  return (
    <ThemeProvider theme={ogTheme}>
      <Flex
        sx={{
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        {coverImage && (
          <Img
            fluid={coverImage.childImageSharp.fluid}
            fadeIn={false}
            backgroundColor="#1e5f92"
            className="image"
            loading="eager"
          />
        )}
        <Flex
          sx={{
            flexDirection: "column",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: gradient,
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: "10vmin",
            }}
          >
            <ThemeProvider
              theme={{
                ...ogTheme,
                colors: {
                  text: "white",
                  secondary: "white",
                },
              }}
            >
              <Logo />
            </ThemeProvider>
          </Box>
          <Box>
            <Text
              sx={{
                variant: "textStyles.sectionTitle",
                fontSize: 2,
                my: 0,
                p: "10vmin",
              }}
            >
              <Text sx={{ color: "background" }}>{title}</Text>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </ThemeProvider>
  )
}
