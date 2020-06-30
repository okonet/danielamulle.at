import React from "react"
import { Styled } from "theme-ui"

function Preparation({ children }) {
  const handleClick = React.useCallback((event) => {
    // console.log(event)
  }, [])
  return (
    <>
      <Styled.h2>Zubereitung</Styled.h2>
      <Styled.ol>
        {React.Children.map(children, (child) =>
          React.Children.map(child.props.children, (listItem) =>
            React.cloneElement(listItem, {
              onClick: handleClick,
            })
          )
        )}
      </Styled.ol>
    </>
  )
}

export default Preparation
