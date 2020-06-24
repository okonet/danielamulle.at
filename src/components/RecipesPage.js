/* @jsx jsx */
import React from "react"
import { Box, Flex, Container, Grid, jsx, Styled, Text } from "theme-ui"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { recipesTheme } from "../theme"
import RecipeCard from "./RecipeCard"
import Link from "./Link"
import Tag from "./Tag"
import Group from "react-group"
import Content from "../../content/sections/recipes.mdx"

export default ({ data }) => {
  const { allCategory } = data
  console.log(allCategory)
  const mainCategories = allCategory.nodes.filter((cat) => !cat.isTag)
  const tags = allCategory.nodes.filter((cat) => cat.isTag)

  return (
    <Layout theme={recipesTheme}>
      <SEO title="Rezepte" />

      <Container>
        <Content />

        <Box
          as="aside"
          sx={
            {
              // gridColumnStart: 1,
              // gridColumnEnd: [1, 3]
            }
          }
        >
          {tags && (
            <Group as="nav" separator={" "}>
              {tags.map((category) => (
                <Tag sx={{ my: 1, color: "text" }}>
                  <Link to={category.slug} key={category.id}>
                    {category.id}
                  </Link>
                  <Text as="span" sx={{ px: 1, fontSize: 0, color: "muted" }}>
                    ×{category.recipes.length}
                  </Text>
                </Tag>
              ))}
            </Group>
          )}
        </Box>
      </Container>

      <Container variant={"full"}>
        {mainCategories.map((category) => (
          <>
            <Text
              as="h2"
              sx={{ variant: "textStyles.subTitle", my: 3, mx: 84 }}
            >
              <Link to={category.slug}>{category.id}</Link>{" "}
              <Tag>{category.recipes.length}</Tag>
            </Text>
            {category.recipes.length > 0 && (
              <Grid gap={4} columns={[1, 2, 3]} sx={{ mb: 4 }}>
                {category.recipes.map((recipe) => (
                  <RecipeCard {...recipe} key={recipe.id} />
                ))}
              </Grid>
            )}
          </>
        ))}
      </Container>
    </Layout>
  )
}
