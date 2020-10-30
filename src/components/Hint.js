/* @jsx jsx */
import React from "react"
import { Box, jsx, Text } from "theme-ui"

function Hint(props) {
  return (
    <Box
      sx={{
        p: 0,
        my: 4,
        fontStyle: "italic",
        fontSize: 2,
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
