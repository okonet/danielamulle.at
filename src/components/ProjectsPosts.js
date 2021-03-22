/* @jsx jsx */
import React from "react"
import { Box, Grid, jsx } from "theme-ui"
import { projectsTheme } from "../theme"
import PageLayout from "./PageLayout"
import PostCard from "./PostCard"
import hydrate from "next-mdx-remote/hydrate"
import components from "../gatsby-plugin-theme-ui/components"

const ProjectsPosts = ({ categories, section }) => {
  return (
    <PageLayout theme={projectsTheme} title={section.title}>
      {section.body && hydrate(section.body, { components })}
      {categories.length > 0 && (
        <Grid as="ul" columns={[1, 2]} sx={{ p: 0 }}>
          {categories.map((project) => (
            <Box
              key={project.slug}
              as="li"
              sx={{ m: 0, p: 0, listStyle: "none" }}
            >
              <PostCard
                coverImage={project.coverImage}
                slug={`/projects/${project.rawSlug}`}
                title={project.id}
              />
            </Box>
          ))}
        </Grid>
      )}
    </PageLayout>
  )
}

export default ProjectsPosts
