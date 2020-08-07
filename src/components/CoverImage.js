/** @jsx jsx */
import React from "react"
import Img from "gatsby-image"
import { Box, jsx, Text } from "theme-ui"

function CoverImage({ fluid, author, url }) {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundBlendMode: "difference",
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
          sx={{
            position: "absolute",
            p: 1,
            mr: 0,
            mb: 0,
            right: 0,
            bottom: 0,
            fontSize: 0,
            color: "background",
            opacity: 0.75,
            writingMode: "vertical-rl",
            textOrientation: "sideways",
            bg: "rgba(0,0,0,0.25)",
            a: {
              color: "background",
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
