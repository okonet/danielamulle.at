/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, jsx, Styled } from "theme-ui"
import Link from "./Link"
import { testimonialsTheme } from "../theme"
import Tag from "./Tag"
import Group from "react-group"
import PageLayout from "./PageLayout"

const TestimonialsPost = ({ data }) => {
  const { body, title, categories } = data.post
  return (
    <PageLayout title={title} theme={testimonialsTheme}>
      <Box
        sx={{
          "& > p:first-of-type": {
            variant: "textStyles.lead",
          },
        }}
      >
        <MDXRenderer>{body}</MDXRenderer>
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "baseline",
          gridColumnStart: [1, 1],
          gridColumnEnd: [1, 12],
        }}
      >
        {categories && (
          <>
            <Styled.h3 sx={{ m: 0, mr: 2 }}>Kategorien:</Styled.h3>
            <Box sx={{ m: 0 }}>
              <Group as="p" separator=" ">
                {categories.map((category) => (
                  <Tag key={category.id} sx={{ my: 1 }}>
                    <Link to={category.slug}>{category.id}</Link>
                  </Tag>
                ))}
              </Group>
            </Box>
          </>
        )}
      </Box>
    </PageLayout>
  )
}

export default TestimonialsPost
