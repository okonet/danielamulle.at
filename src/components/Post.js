import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"

export default ({ data }) => {
  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <h1>{data.mdx.frontmatter.title}</h1>
      <datetime>{data.mdx.frontmatter.date}</datetime>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  )
}
