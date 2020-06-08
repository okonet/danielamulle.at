/* @jsx jsx */
import React from "react"
import { Box, jsx, Text } from "theme-ui"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

function Logo(props) {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "logo@2x.png" }) {
        childImageSharp {
          fixed(width: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Link
      to={"/"}
      activeClassName="active"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        "> .gatsby-image-wrapper": {
          transition: "transform 0.5s",
        },
        ":hover:not(.active) > .gatsby-image-wrapper": {
          transform: "rotate(360deg)",
        },
      }}
    >
      <Img fixed={data.image.childImageSharp.fixed} alt="Logo" />
      <Box sx={{ ml: 1 }}>
        <Text
          as="p"
          sx={{ m: 0, color: "text", fontFamily: "heading", fontSize: 0 }}
        >
          Diätologin & Ernährungswissenschafterin
        </Text>
        <Text
          as="h1"
          sx={{
            m: 0,
            color: "text",
            fontFamily: "heading",
            fontWeight: "heading",
            fontSize: 2,
          }}
        >
          Daniela Mulle
        </Text>
      </Box>
    </Link>
  )
}

export default Logo
