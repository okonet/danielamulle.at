/* @jsx jsx */
import React from "react"
import { Box, jsx, Text } from "theme-ui"

function Hint(props) {
  return (
    <Box
      sx={{
        p: 3,
        py: 1,
        mx: -3,
        my: 4,
        bg: "white",
        color: "muted",
        borderLeft: "4px solid",
        borderLeftColor: "muted",
        borderRadius: "medium",
        fontStyle: "italic",
        "> *": {
          m: 0,
        },
      }}
    >
      {props.children}
    </Box>
  )
}

export default Hint
