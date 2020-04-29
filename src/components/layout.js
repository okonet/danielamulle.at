/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Container, Flex } from "theme-ui"
import Logo from "./Logo"
import Navigation from "./Navigation"

const Layout = ({ children }) => {
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
      <Box as={"header"} sx={{ bg: "orange.6", p: 4 }}>
        <Container>
          <Flex>
            <Logo />
            <Navigation sx={{ ml: "auto" }} />
          </Flex>
        </Container>
      </Box>

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
