/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { testimonialsTheme } from "../theme"
import LeadLayout from "./LeadLayout"
import hydrate from "next-mdx-remote/hydrate"
import components from "./mdx-components"

export default function ResourcePostPage({ post }) {
  const {
    body,
    coverImage,
    coverImageAuthor,
    coverImageLink,
    socialImage,
    title,
    subtitle,
  } = post
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
      {hydrate(body, { components })}
    </LeadLayout>
  )
}
