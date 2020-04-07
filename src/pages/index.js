import React from "react"
import { Box, Flex } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Home from "../../content/home.md"
import Img from "gatsby-image"

const IndexPage = () => {
  const portrait = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "portrait.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const imgData = portrait.placeholderImage.childImageSharp.fluid
  return (
    <Layout>
      <SEO title="Home" />
      <Flex
        sx={
          {
            // height: "100vh",
          }
        }
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Home />
        </Box>
        <Box
          sx={{
            flex: 1,
            width: "50%",
          }}
        >
          <Img fluid={imgData} />
        </Box>
      </Flex>
    </Layout>
  )
}

export default IndexPage
