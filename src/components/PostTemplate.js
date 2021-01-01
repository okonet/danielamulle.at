/** @jsx jsx */
import React from "react"
import { Box, Grid, jsx } from "theme-ui"

export default function PostTemplate({ main, sidebar }) {
  return (
    <Grid gap={4} columns={[1, 1, 12]} sx={{ mx: [0, 0, -4] }}>
      <Box
        sx={{
          gridColumnStart: 1,
          gridColumnEnd: [1, 1, 10],
          "& > p:first-of-type": {
            variant: "textStyles.lead",
          },
        }}
      >
        {main}
      </Box>

      <Box
        as="aside"
        sx={{
          my: 3,
          gridColumn: [1, 1, "10 / span 3"],
        }}
      >
        {sidebar}
      </Box>
    </Grid>
  )
}
