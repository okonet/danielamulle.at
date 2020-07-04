/* @jsx jsx */
import React from "react"
import { jsx, Box, Container, Flex } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Home, * as content from "../../content/sections/home.mdx"
import { homeTheme } from "../theme"
import PageLayout from "../components/PageLayout"

const IndexPage = () => {
  const portrait = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "portrait.png" }) {
        childImageSharp {
          resize(width: 400, quality: 100) {
            src
          }
        }
      }
    }
  `)
  const imgData2 = portrait.placeholderImage.childImageSharp.resize
  return (
    <PageLayout theme={homeTheme}>
      <Flex
        sx={{
          flexDirection: ["column", "row"],
          alignItems: "center",
          "& h1": {
            textAlign: ["center", "left"],
          },
        }}
      >
        <Flex
          sx={{
            order: [0, 1],
            flex: "0 1 auto",
            alignItems: "flex-start",
            mr: [0, 4],
          }}
        >
          <Box
            sx={{
              width: [150, 200],
              height: [150, "auto"],
              borderRadius: ["round", "none"],
              overflow: "hidden",
              objectFit: "cover",
            }}
          >
            <img
              src={imgData2.src}
              alt="Portrait von Daniela Mulle"
              sx={{ width: "100%" }}
            />
          </Box>
        </Flex>
        <Box
          sx={{
            display: "block",
            flex: 1,
            "& > p:first-of-type": {
              variant: "textStyles.lead",
            },
          }}
        >
          <Home />
        </Box>
      </Flex>
    </PageLayout>
  )
}

export default IndexPage
