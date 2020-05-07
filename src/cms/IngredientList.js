/* @jsx jsx */
import React from "react"
import { Box, jsx } from "theme-ui"
import { List } from "immutable"

function valueToString(value) {
  return value ? value.join(",").replace(/,([^\s]|$)/g, "\n$1") : ""
}

export class IngredientListWidget extends React.Component {
  render() {
    const { value, onChange, forID, classNameWrapper } = this.props
    const handleChange = (e) => {
      onChange(List(e.target.value.split("\n")))
    }
    return (
      <textarea
        id={forID}
        value={valueToString(value)}
        onChange={handleChange}
        className={classNameWrapper}
        rows={10}
      />
    )
  }
}
