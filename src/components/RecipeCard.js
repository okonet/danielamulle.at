import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"
import Img from "gatsby-image"
import { AspectRatio, Box, Flex, Text } from "theme-ui"
import { transparentize } from "@theme-ui/color"

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

function RecipeCard({ coverImage, categories, slug, title, ...props }) {
  const gradient = () => (theme) => {
    return `linear-gradient(
            ${transparentize("text", 1)(theme)}, 
            ${transparentize("text", 0)(theme)}
        )`
  }
  return (
    <Box
      sx={{
        borderRadius: "medium",
        overflow: "hidden",
        boxShadow: "float",
      }}
    >
      <Link
        to={slug}
        sx={{
          display: "block",
          overflow: "hidden",
          bg: "teal.1",
        }}
      >
        <AspectRatio ratio={1.5}>
          {coverImage && (
            <Img
              fluid={coverImage.childImageSharp.fluid}
              fadeIn={true}
              backgroundColor="#1e5f92"
              className="image"
            />
          )}
          <Flex
            sx={{
              flexDirection: "column",
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
            }}
          >
            <Text
              sx={{
                variant: "textStyles.sectionTitle",
                fontSize: 1,
                my: 0,
                p: 3,
                backgroundImage: gradient,
              }}
            >
              <Text sx={{ color: "background" }}>{title}</Text>
            </Text>
          </Flex>
        </AspectRatio>
      </Link>
    </Box>
  )
}

export default RecipeCard
