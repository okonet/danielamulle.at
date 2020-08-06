/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Container, Flex, Styled, ThemeProvider } from "theme-ui"
import Logo from "./Logo"
import Navigation from "./Navigation"
import { default as defaultTheme } from "../theme"
import { transparentize } from "@theme-ui/color"
import Link from "./Link"
import Group from "react-group"
import SEO from "./seo"

const Layout = ({ theme = defaultTheme, children, mainStyles }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
          phone
          email
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
        <Box
          as={"header"}
          sx={{
            py: 3,
            position: "relative",
            top: 0,
            width: "100%",
            bg: transparentize("background", 0),
            // backgroundImage: `linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0))`,
            backdropFilter: "blur(32px)",
            zIndex: 10,
          }}
        >
          <Container variant="full">
            <Box
              sx={{
                display: ["block", "flex", "flex"],
              }}
            >
              <Logo />
              <Navigation sx={{ ml: "auto", mt: 3 }} />
            </Box>
          </Container>
        </Box>

        <Flex
          as="main"
          sx={{
            flexDirection: "column",
            flexGrow: 1,
            bg: "background",
            ...mainStyles,
          }}
        >
          {children}
        </Flex>

        <Box as="footer" sx={{ flexShrink: 1, bg: "background" }}>
          <Container
            variant="section"
            sx={{ bg: "transparent", color: "secondary", fontSize: 0 }}
          >
            <Box sx={{ display: ["block", "flex"], alignItems: "flex-end" }}>
              <Box sx={{ flex: 1 }}>
                <Styled.p>
                  ☎{" "}
                  <Styled.a href={`tel:${site.siteMetadata.phone}`}>
                    {site.siteMetadata.phone}
                  </Styled.a>
                  <br />
                  ✉️{" "}
                  <Styled.a href={`mailto:${site.siteMetadata.email}`}>
                    {site.siteMetadata.email}
                  </Styled.a>
                  <br />© {site.siteMetadata.author}, {new Date().getFullYear()}
                </Styled.p>
              </Box>
              <Box sx={{ textAlign: ["left", "right"] }}>
                <Box
                  css={{
                    "@media print": {
                      display: "none",
                    },
                  }}
                >
                  <Group as="nav" separator=" • ">
                    <Link to="/impressum">Impressum</Link>
                    <Link to="/datenschutz">Datenschutz</Link>
                  </Group>
                </Box>
                <Styled.p>
                  Made with ♡ by{" "}
                  <Styled.a href="https://component.driven.io">
                    Component-Driven
                  </Styled.a>
                </Styled.p>
              </Box>
            </Box>
          </Container>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
