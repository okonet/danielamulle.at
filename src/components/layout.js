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

const Layout = ({ theme = defaultTheme, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
      <Box
        as={"header"}
        sx={{
          py: 3,
          position: "fixed",
          top: 0,
          width: "100%",
          // bg: transparentize("background", 0.75),
          // backdropFilter: "blur(32px)",
          zIndex: 10,
        }}
      >
        <Container variant="full">
          <Box
            sx={{
              px: [0, 0, 3],
              display: ["block", "block", "flex"],
            }}
          >
            <Logo />
            <Navigation sx={{ ml: "auto", mt: 3 }} />
          </Box>
        </Container>
      </Box>

      <ThemeProvider theme={theme}>
        <Flex
          as="main"
          sx={{ flexDirection: "column", flexGrow: 1, bg: "background" }}
        >
          {children}
        </Flex>
      </ThemeProvider>

      <Box as="footer" sx={{ py: 4, flexShrink: 1 }}>
        <Container sx={{ color: "secondary", fontSize: 0 }}>
          <Group as="nav" separator=" • ">
            <Link to="/impressum">Impressum</Link>
            <Link to="/datenschutz">Datenschutz</Link>
          </Group>
          <Styled.p>
            © {data.site.siteMetadata.author}, {new Date().getFullYear()}
          </Styled.p>
        </Container>
      </Box>
    </Flex>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
