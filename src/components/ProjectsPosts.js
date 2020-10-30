/* @jsx jsx */
import React from "react"
import { Container, jsx } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { projectsTheme } from "../theme"
import Content, * as meta from "../../content/sections/projects.mdx"
import Link from "./Link"

const ProjectsPosts = ({ data }) => {
  const { projects } = data
  console.log(projects)

  return (
    <Layout theme={projectsTheme}>
      <SEO title={meta._frontmatter.title} />
      <Container>
        <Content />
        <ul>
          {projects.nodes.map((project) => (
            <li>
              <Link to={project.slug}>{project.id}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export default ProjectsPosts
