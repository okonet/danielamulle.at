/* @jsx jsx */
import React from "react"
import { Container, jsx } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { projectsTheme } from "../theme"
import Content, * as meta from "../../content/sections/projects.mdx"
import { Grid } from "@theme-ui/components"
import PostCard from "./PostCard"

const ProjectsPosts = ({ data }) => {
  const { projects } = data

  return (
    <Layout theme={projectsTheme}>
      <SEO title={meta._frontmatter.title} />
      <Container>
        <Content />
        <Grid as="ul" columns={[1, 2]} sx={{ p: 0 }}>
          {projects.nodes.map((project) => (
            <PostCard
              as="li"
              coverImage={project.coverImage}
              slug={project.slug}
              title={project.id}
              key={project.id}
            />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default ProjectsPosts
