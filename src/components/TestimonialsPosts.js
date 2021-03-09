/* @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import PageLayout from "./PageLayout"
import { testimonialsTheme } from "../theme"
import Content, { title } from "../../content/sections/testimonials.mdx"
import Link from "./Link"

const TestimonialsPosts = ({ posts }) => {
  console.log(posts)
  return (
    <PageLayout theme={testimonialsTheme} title={title}>
      <Content />
      <Styled.ol>
        {posts.map((post) => (
          <Styled.li key={post.id}>
            <Link to={post.slug}>{post.title}</Link>
          </Styled.li>
        ))}
      </Styled.ol>
    </PageLayout>
  )
}

export default TestimonialsPosts
