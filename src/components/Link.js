/* @jsx jsx */
import React from "react"
import { Styled, jsx } from "theme-ui"
import NextLink from "next/link"

export default function Link({ sx, children, ...props }) {
  return (
    <NextLink passHref {...props}>
      <Styled.a
        sx={{
          variant: "styles.a",
          ...sx,
        }}
      >
        {children}
      </Styled.a>
    </NextLink>
  )
}
