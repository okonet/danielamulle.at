import React from "react"
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
        borderRadius: "round",
        border: "thin",
        borderColor: "gray.5",
        "> a": {
          textDecoration: "none",
        },
      }}
      {...props}
    />
  )
}
