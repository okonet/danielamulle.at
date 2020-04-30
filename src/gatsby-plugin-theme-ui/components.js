/* @jsx jsx */
import React from "react"
import { Box, jsx, Text } from "theme-ui"
import Hint from "../components/Hint"

export default {
  blockquote: Hint,
  ol: (props) => (
    <Box
      as="ol"
      sx={{
        p: 0,
        pl: 3,
        mt: 3,
      }}
    >
      {props.children}
    </Box>
  ),
  li: (props) => (
    <Box
      as="li"
      sx={{
        color: "text",
        mb: 3,
      }}
    >
      {props.children}
    </Box>
  ),
  // h1: props => (
  //     <h1 {...props}>
  //         <a href={`#${props.id}`}>{props.children}</a>
  //     </h1>
  // ),
}
