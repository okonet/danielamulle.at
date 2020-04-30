/* @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { Link } from "gatsby"

export default ({ sx, ...props }) => (
  <Link
    activeClassName="active"
    sx={{
      color: "inherit",
      "&:hover": {
        color: "accent",
      },
      "&.active": {
        color: "accent",
      },
      ...sx,
    }}
    {...props}
  />
)
