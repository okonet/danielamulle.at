/** @jsx jsx */
import React from "react"
import Img from "gatsby-image"
import { Box, jsx, Text } from "theme-ui"

function CoverImage({ fluid, author, url }) {
  return (
    <Box
      as="figure"
      sx={{
        position: "relative",
      }}
    >
      <Img
        fluid={fluid}
        style={{
          maxHeight: 500,
        }}
      />
      {author && (
        <Text
          as="figcaption"
          sx={{
            position: "absolute",
            p: 1,
            right: 0,
            bottom: [-22],
            fontFamily: "monospace",
            fontStyle: "italic",
            fontSize: "10px",
            color: "muted",
            opacity: 0.5,
            transform: "rotate(90deg)",
            transformOrigin: "right top",
            mixBlendMode: "exclusion",
            a: {
              color: "muted",
            },
          }}
        >
          © {url ? <a href={url}>{author}</a> : author}
        </Text>
      )}
    </Box>
  )
}

export default CoverImage
