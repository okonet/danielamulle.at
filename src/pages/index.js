import React from "react"
import { Box } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Home from "../../content/home.md"

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
      <Box
        gap={3}
        sx={{
          height: "100vh",
          backgroundImage: `url(${imgData.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
        }}
      >
        <Home />
      </Box>
    </Layout>
  )
}

export default IndexPage
