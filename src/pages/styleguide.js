import React from "react"
import { Colors, Spacing } from "@component-driven/react-design-tokens"
import { Box, Container, Styled } from "theme-ui"
import theme, * as themes from "../theme"

const sections = ["about", "how", "what", "recipes"]

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

        <Styled.h1>Palette</Styled.h1>
        <Colors theme={{ colors: themes.palette }} />

        <Styled.h1>Default theme</Styled.h1>
        <Colors theme={theme} />

        {sections.map((sectionName) => (
          <>
            <Styled.h1>Section "{sectionName}" theme</Styled.h1>
            <Colors theme={themes[`${sectionName}Theme`]} />
          </>
        ))}
      </Container>
    </Box>
  )
}
