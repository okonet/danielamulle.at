import React from "react"
import { Box } from "theme-ui"

export default function Tag(props) {
  return (
    <Box
      as="span"
      sx={{
        display: "inline-block",
        px: 2,
        fontSize: 0,
        fontFamily: "monospace",
        lineHeight: 1.75,
        color: "secondary",
        borderRadius: "round",
        border: "thin",
        borderColor: "muted",
        "> a": {
          color: "secondary",
          textDecoration: "none",
          borderBottom: "none",
          ":hover": {
            color: "primary",
          },
        },
      }}
      {...props}
    />
  )
}
