import * as React from "react"
import * as PropTypes from "prop-types"
import { Box, Container, ThemeProvider } from "theme-ui"
import theme, { aboutTheme, howTheme, recipesTheme, whatTheme } from "../theme"

function getTheme(name) {
  switch (name) {
    case "about": {
      return aboutTheme
    }
    case "how": {
      return howTheme
    }
    case "what": {
      return whatTheme
    }
    case "recipes": {
      return recipesTheme
    }
    default: {
      return theme
    }
  }
}

function Section({ name, children, sx, ...props }) {
  const theme = getTheme(name)
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
  name: PropTypes.oneOf(["about", "how", "what", "recipes"]),
}

export default Section
