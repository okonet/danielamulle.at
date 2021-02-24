/* @jsx jsx */
import * as React from "react"
import { Container, jsx } from "theme-ui"

export default function CTABlock({ children, listId, ...props }) {
  return (
    <Container
      variant="section"
      sx={{
        my: 4,
        bg: "headerBg",
        "> h2": {
          mt: 0,
          mb: 4,
        },
      }}
      {...props}
    >
      {children}
    </Container>
  )
}
