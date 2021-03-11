/* @jsx jsx */
import React from "react"
import { Box, Grid, jsx } from "theme-ui"
import { projectsTheme } from "../theme"
import Content, { title } from "../../content/sections/projects.mdx"
import PageLayout from "./PageLayout"
import PostCard from "./PostCard"

const ProjectsPosts = ({ posts }) => {
  return (
    <PageLayout theme={projectsTheme} title={title}>
      <Content />
      {posts.length > 0 && (
        <Grid as="ul" columns={[1, 2]} sx={{ p: 0 }}>
          {posts.map((project) => (
            <Box
              key={project.slug}
              as="li"
              sx={{ m: 0, p: 0, listStyle: "none" }}
            >
              <PostCard
                coverImage={project.coverImage}
                slug={project.slug}
                title={project.title}
              />
            </Box>
          ))}
        </Grid>
      )}
    </PageLayout>
  )
}

export default ProjectsPosts
