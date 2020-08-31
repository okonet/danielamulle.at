/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Box, Container, Flex, ThemeProvider } from "theme-ui"
import { transparentize } from "@theme-ui/color"
import Logo from "./Logo"
import Navigation from "./Navigation"
import Footer from "./Footer"
import { default as defaultTheme, footerTheme } from "../theme"
import SubscribeForm from "./SubscribeForm"

const Layout = ({ theme = defaultTheme, children, mainStyles }) => {
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
              <Navigation sx={{ ml: "auto" }} />
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

        <SubscribeForm />

        <Footer />
      </Flex>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
