import React from "react"
import {
  Colors,
  Spacing,
  Swatch,
  Swatches,
  SwatchToken,
  Typography,
} from "@component-driven/react-design-tokens"
import { Box, Container, Grid, Styled } from "theme-ui"
import theme, * as themes from "../theme"
import logo from "../images/logo/logo.png"
import logo2x from "../images/logo/logo@2x.png"
import logoSVG from "../images/logo/logo.svg"

export default () => {
  return (
    <Box
      sx={{
        p: 5,
        bg: "#fff",
      }}
    >
      <Container>
        <Styled.h1>Logos</Styled.h1>
        <Grid gap={4}>
          <Swatches
            theme={theme}
            items={{
              png: logo,
              "png@2x": logo2x,
              svg: logoSVG,
            }}
          >
            {(token, value) => (
              <Swatch token={token} value={value} key={token}>
                <Grid
                  sx={{
                    gridTemplateColumns: "100px 1fr",
                    alignItems: "center",
                  }}
                >
                  <SwatchToken>{token}</SwatchToken>
                  <Box
                    as="img"
                    src={value}
                    sx={{
                      maxWidth: 400,
                    }}
                  />
                </Grid>
              </Swatch>
            )}
          </Swatches>
        </Grid>
        <Styled.h1>Spacing</Styled.h1>
        <Spacing theme={theme} />

        <Styled.h1>Typography</Styled.h1>
        <Typography theme={theme} />

        <Styled.h1>Palette</Styled.h1>
        <Colors theme={{ colors: themes.palette }} />

        {Object.keys(themes)
          .filter((t) => t !== "palette")
          .map((sectionName) => (
            <React.Fragment key={sectionName}>
              <Styled.h1>{sectionName}</Styled.h1>
              <Colors theme={themes[sectionName]} />
            </React.Fragment>
          ))}
      </Container>
    </Box>
  )
}
