import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"
import Img from "gatsby-image"
import { AspectRatio, Box, Flex, Text } from "theme-ui"
import { transparentize } from "@theme-ui/color"
import { Grid } from "@theme-ui/components"

PostCard.propTypes = {
  author: PropTypes.string,
  coverImage: PropTypes.object.isRequired,
  date: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

function PostCard({
  coverImage,
  coverImageAuthor: author,
  date,
  slug,
  title,
  ...props
}) {
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
      {...props}
    >
      <Link
        to={slug}
        sx={{
          display: "block",
          overflow: "hidden",
          bg: "teal.1",
          ".image": {
            transition: "transform 500ms ease-in-out",
          },
          ":hover .image": {
            transform: "scale(1.125)",
          },
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
            <Grid
              gap={2}
              sx={{
                p: 3,
                backgroundImage: gradient,
              }}
            >
              <Text
                as="h3"
                sx={{
                  variant: "textStyles.cardTitle",
                }}
              >
                {title}
              </Text>
              {author && (
                <Text
                  sx={{
                    variant: "textStyles.cardMeta",
                  }}
                >
                  bei {author}
                </Text>
              )}
              {date && (
                <Text
                  sx={{
                    variant: "textStyles.cardMeta",
                  }}
                >
                  {date}
                </Text>
              )}
            </Grid>
          </Flex>
        </AspectRatio>
      </Link>
    </Box>
  )
}

export default PostCard
