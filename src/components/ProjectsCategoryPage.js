/* @jsx jsx */
import React from "react"
import { Box, Container, Grid, jsx, Styled, Text } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Link from "../components/Link"
import { blogTheme, projectsTheme } from "../theme"
import { blogPath, projectsPath } from "../../paths"
import groupBy from "lodash.groupby"
import RecipesList from "./RecipesList"
import Group from "react-group"
import Section from "./Section"
import PageLayout from "./PageLayout"
import PostCard from "./PostCard"
import CoverImage from "./CoverImage"

const ProjectsCategoryPage = ({ data }) => {
  const { category, projectPosts } = data
  const { coverImage, coverImageAuthor, coverImageLink } = category
  return (
    <PageLayout
      theme={projectsTheme}
      title={`${category.id}`}
      coverImage={
        <CoverImage
          fluid={coverImage.childImageSharp.fluid}
          author={coverImageAuthor}
          url={coverImageLink}
        />
      }
    >
      {category.postCount > 0 ? (
        <Grid
          as="ol"
          gap={3}
          columns={[1, 2, 3]}
          sx={{ my: 2, mx: [2, 0, 0], p: 0 }}
        >
          {projectPosts.nodes.map((post) => (
            <PostCard as="li" {...post} key={post.id} />
          ))}
        </Grid>
      ) : (
        <Text
          as="p"
          my={5}
          sx={{ variant: "textStyles.lead", color: "secondary" }}
        >
          Keine Einträge in diesem Projekt gefunden.{" "}
          <Link to={`/${projectsPath}`}>Alle Projekte</Link>.
        </Text>
      )}
    </PageLayout>
  )
}

export default ProjectsCategoryPage
