/* @jsx jsx */
import React from "react"
import { Box, jsx, Text } from "theme-ui"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

function Logo() {
  const { site, image } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          role
        }
      }
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
      <Img fixed={image.childImageSharp.fixed} alt="Logo" />
      <Box sx={{ ml: 1 }}>
        <Text
          as="p"
          sx={{
            m: 0,
            color: "secondary",
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "condensed",
            maxWidth: "20ch",
          }}
        >
          {site.siteMetadata.role}
        </Text>
        <Text
          as="h1"
          sx={{
            m: 0,
            color: "text",
            fontFamily: "body",
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
