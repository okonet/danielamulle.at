import React from "react"
import { Colors } from "@component-driven/react-design-tokens"
import { Box } from "theme-ui"
import theme from "../theme"

export default () => {
  return (
    <Box
      sx={{
        p: 5,
        bg: "#fff",
      }}
    >
      <Colors theme={theme} />
    </Box>
  )
}
