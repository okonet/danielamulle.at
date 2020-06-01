/** @jsx jsx */
import * as React from "react"
import * as PropTypes from "prop-types"
import { jsx, Box, Container, ThemeProvider } from "theme-ui"
import { default as defaultTheme } from "../theme"
import { ParallaxGroup, ParallaxLayer } from "./Parallax"

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
      <ParallaxGroup
        as="section"
        sx={{
          p: 4,
          py: 6,
          backgroundColor: "background",
          color: "text",
          ...sx,
        }}
        {...props}
      >
        {imageId && (
          <ParallaxLayer depth={1}>
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
          </ParallaxLayer>
        )}
        <ParallaxLayer sx={{ display: "flex", alignItems: "center" }}>
          <Container>{children}</Container>
        </ParallaxLayer>
      </ParallaxGroup>
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
