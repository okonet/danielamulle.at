/* @jsx jsx */
import React, { useState } from "react"
import { jsx, Box, Checkbox, Label, Styled } from "theme-ui"

function IngredientItem({ children }) {
  const [completed, setCompleted] = useState(false)
  return (
    <Styled.li
      sx={{
        m: 0,
        mb: 1,
        fontSize: 1,
        fontFamily: "monospace",
        textDecoration: completed ? "line-through" : "none",
        color: completed ? "muted" : "text",
      }}
    >
      <Label sx={{ cursor: "pointer" }}>
        <Box sx={{ flexShrink: 0, mt: "0.3rem" }}>
          <Checkbox
            checked={completed}
            sx={{
              color: "muted",
              width: "1rem",
              height: "1rem",
              "input:checked ~ &": {
                color: "muted",
              },
              "input:focus ~ &": {
                color: "secondary",
                bg: "background",
              },
            }}
            onChange={() => setCompleted(!completed)}
          />
        </Box>
        {children}
      </Label>
    </Styled.li>
  )
}

function Ingredients({ yields, children }) {
  return (
    <>
      <Styled.h2>Zutaten {yields && `für ${yields}`}</Styled.h2>
      <Box
        as="section"
        css={{
          pageBreakInside: "avoid",
        }}
      >
        <Box
          as="ul"
          sx={{
            mt: 3,
            pl: 0,
            listStyle: "none",
          }}
        >
          {React.Children.map(
            children,
            (child) =>
              child &&
              child.props &&
              React.Children.map(
                child.props.children,
                (listItem, index) =>
                  listItem &&
                  listItem.props && (
                    <IngredientItem key={index}>
                      {listItem.props.children}
                    </IngredientItem>
                  )
              )
          )}
        </Box>
      </Box>
    </>
  )
}

export default Ingredients
