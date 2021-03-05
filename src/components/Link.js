/* @jsx jsx */
import React from "react"
import { Styled, jsx } from "theme-ui"
import NextLink from "next/link"

export default function Link({ sx, to, children, ...props }) {
  return (
    <NextLink passHref href={to ?? props.href ?? "/"} {...props}>
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
