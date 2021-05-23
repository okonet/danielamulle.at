/* @jsx jsx */
import React from "react"
import { Styled, jsx } from "theme-ui"
import NextLink from "next/link"

export default function Link({ sx, to, children, disabled = false, ...props }) {
  return (
    <NextLink
      passHref
      href={to ?? props.href ?? "/"}
      shallow={disabled}
      scroll={!disabled}
      {...props}
    >
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
