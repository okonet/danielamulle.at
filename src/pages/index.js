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
  return (
    <Layout>
      <SEO title="Home" />

      <Section name="recipes">
        <Flex>
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
      </Section>

      <Section name="what">
        <How />
      </Section>

      <Section name="how">
        <Focus />
      </Section>

      <Section name="about">
        <About />
      </Section>
    </Layout>
  )
}

export default IndexPage
