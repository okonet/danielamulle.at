/** @jsx jsx */
import React from "react"
import { Box, Styled, jsx } from "theme-ui"
import Group from "react-group"
import Tag from "./Tag"
import Link from "./Link"
import TagIcon from "./TagIcon"

function TagList({ tags }) {
  return (
    tags && (
      <>
        <Styled.h3>
          <TagIcon width={17} sx={{ mr: 1, mb: -1 }} />
          Kategorien
        </Styled.h3>
        <Box sx={{ my: 2, mx: -2 }}>
          <Group as="p" separator=" ">
            {tags.map((category) => (
              <Tag key={category.id} sx={{ my: 1 }}>
                <Link to={category.slug}>{category.id}</Link>
              </Tag>
            ))}
          </Group>
        </Box>
      </>
    )
  )
}

export default TagList
