import React from "react"
import {
  Colors,
  Spacing,
  Typography,
} from "@component-driven/react-design-tokens"
import { Box, Container, Styled } from "theme-ui"
import theme, * as themes from "../theme"

export default () => {
  return (
    <Box
      sx={{
        p: 5,
        bg: "#fff",
      }}
    >
      <Container>
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
