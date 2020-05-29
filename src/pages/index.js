import React from "react"
import { Box, Container, Flex, ThemeProvider } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Home from "../../content/sections/home.mdx"
import How from "../../content/sections/how.mdx"
import Focus from "../../content/sections/focus.mdx"
import About from "../../content/sections/about.mdx"
import Section from "../components/Section"
import { aboutTheme, howTheme, recipesTheme, whatTheme } from "../theme"

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
  console.log(imgData)
  return (
    <Layout>
      <SEO title="Willkommen" />

      <Flex sx={{ px: 4, flexGrow: 1 }}>
        <Container
          sx={{
            display: ["block", "flex"],
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Home />
          </Box>
          <Flex
            sx={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ display: ["none", "block"], width: "100%" }}>
              <Img fluid={imgData} />
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Section theme={whatTheme}>
        <How />
      </Section>
      <Section theme={howTheme}>
        <Focus />
      </Section>
      <Section theme={aboutTheme}>
        <About />
      </Section>
    </Layout>
  )
}

export default IndexPage
