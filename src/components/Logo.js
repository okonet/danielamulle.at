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
          author
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
      <Box sx={{ ml: 1, position: "relative" }}>
        <Text
          as="h1"
          sx={{
            m: 0,
            color: "text",
            fontFamily: "heading",
            fontWeight: "normal",
            fontSize: 2,
          }}
        >
          {site.siteMetadata.author}
        </Text>
        <Text
          as="p"
          sx={{
            display: ["none", "block"],
            m: 0,
            ml: "1px",
            color: "secondary",
            fontFamily: "monospace",
            fontSize: "11px",
            fontStyle: "italic",
            maxWidth: ["20ch", "20ch", "20ch", "40ch"],
          }}
        >
          {site.siteMetadata.role}
        </Text>
      </Box>
    </Link>
  )
}

export default Logo
