/** @jsx jsx */
import * as React from "react"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"
import { Box, Container, jsx, ThemeProvider } from "theme-ui"
import { default as defaultTheme } from "../theme"

function Section({
  theme = defaultTheme,
  coverSrc,
  coverFluid,
  blendMode = "normal",
  children,
  sx,
  ...props
}) {
  let imageSrc = coverSrc || theme.coverSrc
  let imageStyles = {}
  if (imageSrc) {
    let bgSrc = `url(${imageSrc})`
    let srcSet = imageSrc.split(",")
    if (srcSet.length >= 2) {
      bgSrc = `image-set(${srcSet.map((s) =>
        s.replace(/(.+) (.+x)/, 'url("$1") $2')
      )})`
    }
    imageStyles = {
      backgroundImage: bgSrc,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundBlendMode: blendMode,
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        as="section"
        sx={{
          position: "relative",
          bg: "background",
          color: "text",
          ...sx,
        }}
        {...props}
      >
        {imageSrc && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              backgroundColor: "background",
              ...imageStyles,
            }}
          />
        )}
        {coverFluid && (
          <Img
            fluid={coverFluid}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          />
        )}
        <Container sx={{ position: "relative", zIndex: 1 }}>
          {children}
        </Container>
      </Box>
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
