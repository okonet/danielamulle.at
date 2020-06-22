import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"
import Img from "gatsby-image"
import { AspectRatio, Box, Flex, Styled, Text } from "theme-ui"
import CategoryTags from "./CategoryTags"
import { transparentize } from "@theme-ui/color"
import Tag from "./Tag"
import Group from "react-group"

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
            ${transparentize("text", 0)(theme)}, 
            ${transparentize("text", 1)(theme)}
        )`
  }
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
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Text
              sx={{
                variant: "textStyles.sectionTitle",
                my: 0,
                p: 3,
                backgroundImage: gradient,
              }}
            >
              <Text sx={{ color: "background" }}>{title}</Text>
            </Text>
            {categories && (
              <Box
                sx={{
                  mx: 3,
                  mt: "auto",
                  mb: 2,
                }}
              >
                <Group as="p" separator=" ">
                  {categories.map((category) => (
                    <Tag
                      to={category.slug}
                      key={category.id}
                      sx={{
                        bg: transparentize("text", 0.5),
                        backdropFilter: "blur(4px)",
                        color: "muted",
                      }}
                    >
                      {category.id}
                    </Tag>
                  ))}
                </Group>
              </Box>
            )}
          </Flex>
        </AspectRatio>
      </Link>
    </Box>
  )
}

export default RecipeCard
