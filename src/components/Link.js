/* @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"

export default ({ sx, ...props }) => (
  <Link
    activeClassName="active"
    sx={{
      variant: "styles.a",
      ...sx,
    }}
    {...props}
  />
)
