/* @jsx jsx */
import React from "react"
import { jsx, Box } from "theme-ui"
import Ingredients from "../components/Ingredients"
import Preparation from "../components/Preparation"

export default {
  dl: (props) => (
    <Box
      as="dl"
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridGap: 3,
        alignItems: "baseline",
        my: 3,
        dt: {
          m: 0,
          variant: "textStyles.sectionTitle",
          p: {
            color: "muted",
            my: 0,
          },
        },
        dd: {
          m: 0,
          variant: "textStyles.body",
          p: {
            my: 0,
          },
        },
      }}
      {...props}
    />
  ),
  Ingredients,
  Preparation,
}
