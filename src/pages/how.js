import React from "react"
import { Box, Container, Flex } from "theme-ui"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Home from "../../content/sections/home.mdx"
import How from "../../content/sections/how.mdx"
import Focus from "../../content/sections/focus.mdx"
import About from "../../content/sections/about.mdx"
import Section from "../components/Section"
import { aboutTheme, howTheme, whatTheme } from "../theme"

export default () => {
  return (
    <Layout theme={howTheme}>
      <SEO title="Wie" />
      <Section theme={howTheme}>
        <Focus />
      </Section>
    </Layout>
  )
}
