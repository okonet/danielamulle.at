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
    <>
      <ThemeProvider theme={theme}>
        <Box as={"header"} sx={{ bg: "background", p: 4 }}>
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
      </ThemeProvider>

      <main>{children}</main>

      <Container as="footer">
        © {data.site.siteMetadata.author}, {new Date().getFullYear()}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
