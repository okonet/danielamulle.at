import * as React from "react"
import * as PropTypes from "prop-types"
import { Box, Container, ThemeProvider } from "theme-ui"
import { default as defaultTheme } from "../theme"

function Section({ theme = defaultTheme, children, sx, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        as="section"
        sx={{
          p: 4,
          bg: "background",
          color: "text",
          ...sx,
        }}
        {...props}
      >
        <Container>{children}</Container>
      </Box>
    </ThemeProvider>
  )
}

Section.propTypes = {
  theme: PropTypes.object,
}

export default Section
