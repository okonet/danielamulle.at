/** @jsx jsx */
import React from "react"
import { Box, jsx } from "theme-ui"
import { testimonialsTheme } from "../theme"
import Content from "../../content/sections/thanks.mdx"
import LeadLayout from "./LeadLayout"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

export default function ResourcePostPage({ post }) {
  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    socialImage,
    title,
    subtitle,
    subPageType,
  } = post
  let isThanksPage = subPageType === "thanks"
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
          <Content />
        </Box>
      ) : (
        hydrate(body, { components })
      )}
    </LeadLayout>
  )
}
