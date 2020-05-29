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
          p: 4,
          py: 6,
          backgroundColor: "background",
          color: "text",
          ...imageStyles,
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

  /**
   * Image ID on Unsplash.com
   */
  coverImageSrc: PropTypes.string,
}

export default Section
