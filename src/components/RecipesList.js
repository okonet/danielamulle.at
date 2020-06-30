import React from "react"
import { Container, Grid, Text } from "theme-ui"
import RecipeCard from "./RecipeCard"

function RecipesList({ recipes }) {
  return Object.entries(recipes).map(([category, recipe]) => (
    <React.Fragment key={category}>
      <Container>
        <Text as="h2" sx={{ variant: "textStyles.subTitle", my: 3 }}>
          {category}
        </Text>
      </Container>
      <Container variant={"full"}>
        {recipe.length > 0 && (
          <Grid gap={3} columns={[1, 2, 3]} sx={{ mb: 4 }}>
            {recipe.map((recipe) => (
              <RecipeCard {...recipe} key={recipe.id} />
            ))}
          </Grid>
        )}
      </Container>
    </React.Fragment>
  ))
}

export default RecipesList
