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

export default () => {
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
    <Layout theme={whatTheme}>
      <SEO title="Wie" />
      <Section name="what">
        <How />
      </Section>
    </Layout>
  )
}
