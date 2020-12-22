/* @jsx jsx */
import React from "react"
import { Box, Container, Grid, jsx } from "theme-ui"
import { projectsTheme } from "../theme"
import Content, * as meta from "../../content/sections/projects.mdx"
import PageLayout from "./PageLayout"
import PostCard from "./PostCard"

const ProjectsPosts = ({ data }) => {
  const { projects } = data

  return (
    <PageLayout theme={projectsTheme} title={meta._frontmatter.title}>
      <Content />
      {projects.nodes.length > 0 && (
        <Grid as="ul" columns={[1, 2]} sx={{ p: 0 }}>
          {projects.nodes.map((project) => (
            <Box as="li" sx={{ m: 0, p: 0, listStyle: "none" }}>
              <PostCard
                coverImage={project.coverImage}
                slug={project.slug}
                title={project.id}
                key={project.id}
              />
            </Box>
          ))}
        </Grid>
      )}
    </PageLayout>
  )
}

export default ProjectsPosts
