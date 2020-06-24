import React from "react"
import { Link } from "gatsby"
import { Box } from "theme-ui"

export default function(props) {
  return (
    <Box
      as="span"
      sx={{
        display: "inline-block",
        px: 2,
        fontSize: 0,
        fontFamily: "monospace",
        lineHeight: 1.75,
        color: "muted",
        bg: "white",
        borderRadius: "round",
        "> a": {
          textDecoration: "none",
        },
      }}
      {...props}
    />
  )
}
