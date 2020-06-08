/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Container, Flex, ThemeProvider } from "theme-ui"
import Logo from "./Logo"
import Navigation from "./Navigation"
import { default as defaultTheme } from "../theme"

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
    <ThemeProvider theme={theme}>
      <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
        <Box
          as={"header"}
          sx={{ p: 4, position: "sticky", top: 0, zIndex: 10 }}
        >
          <Container variant="full">
            <Box
              sx={{
                display: ["block", "flex"],
              }}
            >
              <Logo />
              <Navigation sx={{ ml: "auto" }} />
            </Box>
          </Container>
        </Box>

        <Flex
          as="main"
          sx={{ flexDirection: "column", flexGrow: 1, bg: "background" }}
        >
          {children}
        </Flex>

        <Box as="footer" sx={{ py: 4, flexShrink: 1 }}>
          <Container>
            © {data.site.siteMetadata.author}, {new Date().getFullYear()}
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
