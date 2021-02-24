/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, jsx } from "theme-ui"
import { testimonialsTheme } from "../theme"
import * as Content from "../../content/sections/thanks.mdx"
import { useLocation } from "@reach/router"
import LeadLayout from "./LeadLayout"

export default function ResourcePostPage({ data }) {
  const { search } = useLocation()
  const { post } = data
  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    socialImage,
    title,
    subtitle,
  } = post
  let isThanksPage = search.includes("thanks")
  return (
    <LeadLayout
      theme={testimonialsTheme}
      title={title}
      subtitle={subtitle}
      coverImage={coverImage}
      coverImageAuthor={coverImageAuthor}
      coverImageLink={coverImageLink}
      socialImage={socialImage}
    >
      {isThanksPage ? (
        <Box sx={{ mt: 4 }}>
          <Content.default />
        </Box>
      ) : (
        <MDXRenderer>{body}</MDXRenderer>
      )}
    </LeadLayout>
  )
}
