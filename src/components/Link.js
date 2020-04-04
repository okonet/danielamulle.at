/* @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Link } from "gatsby";

export default props => (
  <Link
    {...props}
    activeClassName="active"
    sx={{
      color: "inherit",
      "&:hover": {
        color: "primary"
      },
      "&.active": {
        color: "primary"
      }
    }}
  />
);
