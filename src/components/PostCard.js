import React from "react"
import PropTypes from "prop-types"
import Link from "./Link"
import Img from "gatsby-image"
import { AspectRatio, Box, Flex, Text } from "theme-ui"
import { transparentize } from "@theme-ui/color"

PostCard.propTypes = {
  author: PropTypes.string,
  coverImage: PropTypes.object,
  date: PropTypes.string,
  disabled: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  sx: PropTypes.object,
  title: PropTypes.string,
}

function PostCard({ coverImage, author, date, disabled, slug, title, sx }) {
  const gradient = () => (theme) => {
    return `linear-gradient(
            ${transparentize("text", 1)(theme)} 50%, 
            ${transparentize("text", 0)(theme)}
        )`
  }
  return (
    <Link
      to={slug}
      disabled={disabled}
      sx={{
        display: "block",
        overflow: "hidden",
        borderRadius: "medium",
        bg: "text",
        ".image": {
          transition: "transform 500ms ease-in-out",
        },
        ":hover:not([disabled]) .image": {
          transform: "scale(1.125)",
        },
        ":focus:not([disabled]) .image": {
          transform: "scale(1.125)",
        },
        ...sx,
      }}
    >
      <AspectRatio ratio={1.5}>
        {coverImage && (
          <Box
            sx={{
              opacity: disabled ? 0.25 : 1,
            }}
          >
            <Img
              fluid={coverImage.childImageSharp.fluid}
              fadeIn={true}
              backgroundColor="#1e5f92"
              className="image"
            />
          </Box>
        )}
        <Flex
          sx={{
            p: 3,
            flexDirection: "column",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: gradient,
          }}
        >
          <Flex
            sx={{
              order: 2,
              flexDirection: "column",
              opacity: disabled ? 0.25 : 1,
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
                von {author}
              </Text>
            )}
          </Flex>
          <Box sx={{ flexGrow: 1, order: 1 }}>
            {date && (
              <Text
                sx={{
                  variant: "textStyles.cardMeta",
                  order: 0,
                }}
              >
                {date}
              </Text>
            )}
          </Box>
        </Flex>
      </AspectRatio>
    </Link>
  )
}

export default PostCard
