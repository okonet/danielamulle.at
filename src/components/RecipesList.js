import React from "react"
import { Box, Grid, Text } from "theme-ui"
import PostCard from "./PostCard"

function RecipesList({ recipes }) {
  console.log(recipes)
  const categories = Object.keys(recipes)
  return Object.entries(recipes).map(([category, recipe]) => (
    <React.Fragment key={category}>
      {categories.length > 1 && (
        <Text as="h2" sx={{ variant: "textStyles.subTitle", mt: 4 }}>
          {category}
        </Text>
      )}
      {recipe.length > 0 && (
        <Grid
          as="ol"
          gap={[2, 1, 2]}
          columns={[2, 3]}
          sx={{ p: 0, mt: 3, mb: 4, mx: [0, 0, -5], px: [0, 0, 2] }}
        >
          {recipe.map((recipe) => (
            <Box as="li" sx={{ m: 0, p: 0, listStyle: "none" }}>
              <PostCard {...recipe} key={recipe.slug} />
            </Box>
          ))}
        </Grid>
      )}
    </React.Fragment>
  ))
}

export default RecipesList
