/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Flex } from "theme-ui"
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
      <Container as="header">
        <Flex>
          <Logo />
          <Navigation sx={{ ml: "auto" }} />
        </Flex>
      </Container>

      <Container as="main">{children}</Container>

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
