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
import RecipeCard from "./RecipeCard"

const ProjectsCategoryPage = ({ data }) => {
  const { category } = data
  return (
    <PageLayout
      theme={projectsTheme}
      title={`${category.id}`}
      blendMode="overlay"
    >
      {category.postCount > 0 ? (
        <Grid gap={3} columns={[1, 2, 3]} sx={{ my: 2, mx: [2, 0, -4] }}>
          {category.posts.map((post) => (
            <RecipeCard {...post} key={post.id} />
          ))}
        </Grid>
      ) : (
        <Container>
          <Text
            as="p"
            my={5}
            sx={{ variant: "textStyles.lead", color: "secondary" }}
          >
            Keine Einträge in diesem Projekt gefunden.{" "}
            <Link to={`/${projectsPath}`}>Alle Projekte</Link>.
          </Text>
        </Container>
      )}
    </PageLayout>
  )
}

export default ProjectsCategoryPage
