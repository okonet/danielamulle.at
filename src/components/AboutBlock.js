/* @jsx jsx */
import * as React from "react"
import { Box, Flex, jsx } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"

export default function AboutBlock({ children, ...props }) {
  const data = useStaticQuery(graphql`
    query {
      portraitImage: file(relativePath: { eq: "portrait.png" }) {
        childImageSharp {
          resize(width: 400, quality: 100) {
            src
          }
        }
      }
    }
  `)
  return (
    <Flex
      sx={{
        flexDirection: ["column", "column", "row"],
        alignItems: "flex-start",
      }}
      {...props}
    >
      <Box
        sx={{
          display: "block",
          flex: 1,
          "& > p:first-of-type": {
            variant: "textStyles.lead",
          },
        }}
      >
        <Box
          as="figure"
          sx={{
            float: "right",
            width: [200, 250, 300],
            height: [200, 250, "auto"],
            borderRadius: ["round", "round", "none"],
            overflow: "hidden",
            objectFit: "cover",
          }}
        >
          <img
            src={data.portraitImage.childImageSharp.resize.src}
            alt="Portrait von Daniela Mulle"
            sx={{ width: "100%", verticalAlign: "top" }}
          />
        </Box>
        {children}
      </Box>
    </Flex>
  )
}
