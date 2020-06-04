/** @jsx jsx */
import * as React from "react"
import * as PropTypes from "prop-types"
import { jsx, Box, Container, ThemeProvider } from "theme-ui"
import { default as defaultTheme } from "../theme"
import { ParallaxGroup, ParallaxLayer } from "./Parallax"

function Section({ theme = defaultTheme, coverSrc, children, sx, ...props }) {
  let imageSrc = coverSrc || theme.coverSrc
  let imageStyles = {}
  if (imageSrc) {
    imageStyles = {
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay",
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
        {imageSrc && (
          <ParallaxLayer
            depth={1}
            sx={{
              opacity: 1,
              backgroundColor: "background",
              ...imageStyles,
            }}
          />
        )}
        <Container sx={{ position: "relative", zIndex: 1 }}>
          {children}
        </Container>
      </ParallaxGroup>
    </ThemeProvider>
  )
}

Section.propTypes = {
  theme: PropTypes.object,

  /**
   * Cover image
   */
  coverSrc: PropTypes.string,
}

export default Section
