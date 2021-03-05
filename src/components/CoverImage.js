/** @jsx jsx */
import React from "react"
import Img from "next/image"
import { Box, Flex, jsx, Text } from "theme-ui"
import { transparentize } from "@theme-ui/color"

function CoverImage({ src, author, url, children }) {
  const gradient = () => (theme) => {
    return `linear-gradient(
            ${transparentize("secondary", 1)(theme)} 30%, 
            ${transparentize("secondary", 0)(theme)}
        )`
  }
  return (
    <Box
      as="figure"
      sx={{
        position: "relative",
      }}
    >
      <Img
        src={src}
        layout="fill"
        style={{
          maxHeight: 500,
        }}
      />
      <Flex
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          flexDirection: "column",
          justifyContent: "space-between",
          py: 2,
          px: 2,
          width: "100%",
          height: "100%",
          backgroundImage: gradient,
        }}
      >
        {children}
      </Flex>
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
