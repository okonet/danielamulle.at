import React from "react"
import { Box, jsx, Styled } from "theme-ui"

function Ingredients({ amount, children }) {
  console.log(children)
  return (
    <>
      <Styled.h2>Zutaten für {amount}</Styled.h2>
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
