/* @jsx jsx */
import React from "react"
import { Container, Grid, Styled, jsx } from "theme-ui"
import PageLayout from "./PageLayout"
import { testimonialsTheme } from "../theme"
import Content, * as meta from "../../content/sections/testimonials.mdx"
import Link from "./Link"

const TestimonialsPosts = ({ data }) => {
  const { testimonials } = data

  return (
    <PageLayout title={meta._frontmatter.title} theme={testimonialsTheme}>
      <Container variant={"full"}>
        <Content />
        <Styled.ol>
          {testimonials.nodes.map((post) => (
            <Styled.li key={post.id}>
              <Link to={post.slug}>{post.title}</Link>
            </Styled.li>
          ))}
        </Styled.ol>
      </Container>
    </PageLayout>
  )
}

export default TestimonialsPosts
