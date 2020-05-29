import * as React from "react"
import * as PropTypes from "prop-types"
import { Box, Container, ThemeProvider } from "theme-ui"
import { default as defaultTheme } from "../theme"

function unsplashURL(imageId) {
  return `//source.unsplash.com/${imageId}/2560x1920`
}

function Section({
  theme = defaultTheme,
  coverImageId,
  children,
  sx,
  ...props
}) {
  let imageId = coverImageId || theme.coverImageId
  let imageStyles = {}
  if (imageId) {
    const src = unsplashURL(imageId)
    imageStyles = {
      backgroundImage: `url(${src})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundBlendMode: "multiply",
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        as="section"
        sx={{
          position: "relative",
          p: 4,
          py: 6,
          backgroundColor: "background",
          color: "text",
          ...sx,
          zIndex: 0,
        }}
        {...props}
      >
        <Box
          sx={{
            // content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0.1,
            ...imageStyles,
          }}
        />
        <Container>{children}</Container>
      </Box>
    </ThemeProvider>
  )
}

Section.propTypes = {
  theme: PropTypes.object,

  /**
   * Image ID on Unsplash.com
   */
  coverImageSrc: PropTypes.string,
}

export default Section
