import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"
import Img from "gatsby-image"
import { AspectRatio, Box, Flex, Styled } from "theme-ui"
import CategoryTags from "./CategoryTags"
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

function RecipeCard({ coverImage, categories, slug, title }) {
  return (
    <Box>
      <Link
        to={slug}
        sx={{
          display: "block",
          overflow: "hidden",
        }}
      >
        <AspectRatio ratio={1.5}>
          <Img
            fluid={coverImage.childImageSharp.fluid}
            fadeIn={true}
            className="image"
          />
          <Flex
            sx={{
              flexDirection: "column",
              position: "absolute",
              bottom: 0,
              left: 0,
              p: 3,
              width: "100%",
              "& > * > *": {
                display: "inline",
                p: 1,
                lineHeight: 1.46,
                bg: transparentize("text", 0.25),
                backdropFilter: "blur(4px)",
                color: "background",
              },
            }}
          >
            <Styled.h3>
              <span>{title}</span>
            </Styled.h3>
            {categories && (
              <Box>
                <CategoryTags categories={categories} />
              </Box>
            )}
          </Flex>
        </AspectRatio>
      </Link>
    </Box>
  )
}

export default RecipeCard
