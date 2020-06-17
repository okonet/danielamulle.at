import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"
import Img from "gatsby-image"
import { Box, Card, Text } from "theme-ui"
import CategoryTags from "./CategoryTags"

RecipeCard.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
    })
  ),
  coverImage: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

function RecipeCard({ coverImage, categories, date, slug, title }) {
  return (
    <Card>
      {coverImage && (
        <Link
          to={slug}
          sx={{
            display: "block",
            borderRadius: ["none", "medium"],
            overflow: "hidden",
          }}
        >
          <Img fluid={coverImage.childImageSharp.fluid} />
        </Link>
      )}
      <Box
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Text
          as="h2"
          sx={{
            color: "accent",
            fontSize: 1,
            fontFamily: "heading",
            fontWeight: "heading",
            mb: 2,
          }}
        >
          <Link to={slug}>{title}</Link>
        </Text>
        <Text as="p">
          <Box
            as="time"
            sx={{
              fontSize: 0,
              fontFamily: "monospace",
              fontWeight: "body",
              color: "muted",
            }}
          >
            {date}
          </Box>
        </Text>
        {categories && (
          <Box
            sx={{
              mx: -2,
              my: 2,
            }}
          >
            <CategoryTags categories={categories} />
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default RecipeCard
