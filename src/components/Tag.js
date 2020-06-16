import React from "react"
import { Link } from "gatsby"
import { Box } from "theme-ui"

export default function({ children, to }) {
  return (
    <Box
      as={Link}
      to={to}
      sx={{
        display: "inline-block",
        px: 2,
        py: 1,
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
      }}
    >
      {children}
    </Box>
  )
}
