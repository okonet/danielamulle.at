/* @jsx jsx */
import * as React from "react"
import { Container, jsx } from "theme-ui"
import AboutBlock from "./AboutBlock"
import Content from "../../content/sections/bio-short.mdx"

export default function BioBlock(props) {
  return (
    <Container
      variant="section"
      sx={{
        bg: "muted",
      }}
      {...props}
    >
      <AboutBlock sx={{ mb: [0, -4] }}>
        <Content />
      </AboutBlock>
    </Container>
  )
}
