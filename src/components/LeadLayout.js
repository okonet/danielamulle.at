/* @jsx jsx */
import React from "react"
import { Box, Flex, jsx, Styled } from "theme-ui"
import SEO from "../components/seo"
import CoverImage from "./CoverImage"
import Footer from "./Footer"
import ThemeUIProvider from "./ThemeUIProvider"
import Logo from "./Logo"

export default function LeadLayout({
  title,
  subtitle,
  coverImage,
  coverImageAuthor,
  coverImageLink,
  children,
  theme = {},
}) {
  return (
    <>
      <ThemeUIProvider theme={theme}>
        <Flex
          sx={{ flexDirection: "column", minHeight: "100vh", bg: "background" }}
        >
          <Flex
            as="main"
            sx={{
              flexDirection: "column",
              flexGrow: 1,
              bg: "background",
            }}
          >
            <CoverImage
              alt={title}
              src={coverImage}
              author={coverImageAuthor}
              url={coverImageLink}
            >
              <Flex
                sx={{
                  flexGrow: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Logo variant="logo" />
                <Box sx={{ "* + *": { mt: 4 } }}>
                  <Styled.h1
                    sx={{
                      variant: "textStyles.pageTitle",
                      textAlign: "center",
                      color: "background",
                    }}
                  >
                    {title}
                  </Styled.h1>
                  {subtitle && (
                    <Styled.h2
                      sx={{
                        variant: "textStyles.subTitle",
                        textAlign: "center",
                        color: "background",
                      }}
                    >
                      {subtitle}
                    </Styled.h2>
                  )}
                </Box>
              </Flex>
            </CoverImage>

            {children}
          </Flex>
          <Footer />
        </Flex>
      </ThemeUIProvider>
    </>
  )
}
