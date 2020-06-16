import React from "react"
import Group from "react-group"
import Tag from "./Tag"

function CategoryTags({ categories }) {
  return (
    <Group as="p" separator=", ">
      {categories.map((category) => (
        <Tag to={category.fields.slug} key={category.id}>
          #{category.id}
        </Tag>
      ))}
    </Group>
  )
}

export default CategoryTags
