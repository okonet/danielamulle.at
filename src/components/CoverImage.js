/** @jsx jsx */
import React from "react"
import Img from "next/image"
import { AspectRatio, Flex, jsx, Text } from "theme-ui"
import { transparentize } from "@theme-ui/color"

function CoverImage({ alt, src, author, url, children, withOverlay = false }) {
  const gradient = () => (theme) => {
    return `linear-gradient(
            ${transparentize("secondary", 1)(theme)} 30%, 
            ${transparentize("secondary", 0)(theme)}
        )`
  }
  return (
    <AspectRatio ratio={16 / 5} as="figure">
      <Img
        alt={alt}
        src={src}
        layout="fill"
        objectFit="cover"
        sx={{ zIndex: 0 }}
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
          backgroundImage: withOverlay ? gradient : "none",
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
    </AspectRatio>
  )
}

export default CoverImage
