import React from "react"
import { Box, Styled } from "theme-ui"

function Ingredients({ yields, children }) {
  return (
    <>
      <Styled.h2>Zutaten {yields && `für ${yields}`}</Styled.h2>
      <Box
        as="section"
        sx={{
          "& > ul": {
            mt: 3,
            pl: 0,
            listStyle: "none",
          },
          "& > ul > li": {
            m: 0,
            mb: 1,
            fontSize: 1,
            fontFamily: "monospace",
            "::before": {
              content: "'☑️ '",
            },
          },
        }}
      >
        {children}
      </Box>
    </>
  )
}

export default Ingredients
