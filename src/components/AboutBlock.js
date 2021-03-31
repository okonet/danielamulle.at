/* @jsx jsx */
import * as React from "react"
import Image from "next/image"
import { Box, Flex, jsx } from "theme-ui"

export default function AboutBlock({ children, ...props }) {
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
          <Image
            src="/images/portrait.png"
            alt="Portrait von Daniela Mulle"
            width={400}
            height={600}
            sx={{ width: "100%", verticalAlign: "top" }}
          />
        </Box>
        {children}
      </Box>
    </Flex>
  )
}
