import React from "react"
import { Link } from "gatsby"
import { Box } from "theme-ui"

export default function({ children, to, sx }) {
  return (
    <Box
      as={Link}
      to={to}
      sx={{
        display: "inline-block",
        px: 1,
        py: 0,
        fontSize: 0,
        fontFamily: "monospace",
        textDecoration: "none",
        color: "teal.4",
        bg: "teal.6",
        ":hover": {
          color: "teal.6",
          bg: "teal.3",
        },
        borderRadius: "round",
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
