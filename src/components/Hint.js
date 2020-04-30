/* @jsx jsx */
import React from "react"
import { Box, jsx, Text } from "theme-ui"

function Hint(props) {
  return (
    <Box
      sx={{
        p: 3,
        mx: -3,
        my: 3,
        bg: "gray.5",
        color: "gray.2",
        borderLeft: "4px solid",
        borderLeftColor: "orange.3",
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
