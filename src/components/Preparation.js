/* @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"

function Preparation({ children }) {
  return (
    <>
      <Styled.h2>Zubereitung</Styled.h2>
      <Styled.ol>
        {React.Children.map(children, (child) =>
          React.Children.map(child.props.children, (listItem) => {
            return (
              <Styled.li
                sx={{
                  px: 3,
                  mx: -3,
                  py: 2,
                  my: 0,
                  cursor: "pointer",
                  borderRadius: "medium",
                  boxShadow: "none",
                  transform: "scale(1)",
                  transition: "all .25s",
                  ":hover": {
                    boxShadow: "float",
                    transform: "scale(1.1)",
                  },
                }}
              >
                {listItem.props.children}
              </Styled.li>
            )
          })
        )}
      </Styled.ol>
    </>
  )
}

export default Preparation
