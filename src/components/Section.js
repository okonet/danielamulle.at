import * as React from "react"
import * as PropTypes from "prop-types"
import { Box, Container, ThemeProvider } from "theme-ui"
import { aboutTheme, howTheme, recipesTheme, whatTheme } from "../theme"

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
      return recipesTheme
    }
  }
}

function Section({ name, ...props }) {
  const theme = getTheme(name)
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          overflow: "hidden",
          bg: "background",
          color: "text",
          height: "100vh",
        }}
      >
        <Container {...props} />
      </Box>
    </ThemeProvider>
  )
}

Section.propTypes = {
  name: PropTypes.oneOf(["about", "how", "what", "recipes"]),
}

export default Section
