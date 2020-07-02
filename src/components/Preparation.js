import React, { useState } from "react"
import { Styled } from "theme-ui"

function Preparation({ children }) {
  const [currentStep, setCurrentStep] = useState(-1)
  return (
    <>
      <Styled.h2>Zubereitung</Styled.h2>
      <Styled.ol>
        {React.Children.map(children, (child) =>
          React.Children.map(child.props.children, (listItem, index) => {
            const isHighlighted = currentStep === index
            return (
              <Styled.li
                onClick={() =>
                  isHighlighted ? setCurrentStep(-1) : setCurrentStep(index)
                }
                sx={{
                  px: 3,
                  mx: -3,
                  py: 2,
                  my: 0,
                  cursor: "pointer",
                  borderRadius: "medium",
                  boxShadow: isHighlighted ? "float" : "none",
                  transform: isHighlighted ? "scale(1.1)" : "scale(1)",
                  transition: "all .25s",
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
