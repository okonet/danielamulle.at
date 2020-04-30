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
        bg: "teal.6",
        color: "teal.3",
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
