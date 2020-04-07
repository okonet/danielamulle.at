import React from "react"
import { Grid, Card } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import Img from "gatsby-image"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <Grid gap={4} columns={2}>
        {data.allMdx.edges.map(({ node: post }) => (
          <Link to={post.fields.slug}>
            <Card key={post.id}>
              {post.frontmatter.coverImage && (
                <Img
                  fluid={post.frontmatter.coverImage.childImageSharp.fluid}
                />
              )}
              {post.frontmatter.title}
            </Card>
          </Link>
        ))}
      </Grid>
    </Layout>
  )
}
