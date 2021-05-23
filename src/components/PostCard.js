import React from "react"
import PropTypes from "prop-types"
import Img from "next/image"
import { AspectRatio, Box, Flex, Text } from "theme-ui"
import { transparentize } from "@theme-ui/color"
import Link from "./Link"

PostCard.propTypes = {
  author: PropTypes.string,
  coverImage: PropTypes.string,
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
      href={slug}
      disabled={disabled}
      sx={{
        display: "block",
        overflow: "hidden",
        borderRadius: "medium",
        bg: "text",
        img: {
          transition: "transform 500ms ease-in-out",
        },
        ":hover:not([disabled]) img": {
          transform: "scale(1.125)",
        },
        ":focus:not([disabled]) img": {
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
            <Img src={coverImage} layout="fill" />
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
