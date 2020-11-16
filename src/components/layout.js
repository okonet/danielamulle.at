/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Box, Container, Flex, ThemeProvider } from "theme-ui"
import Logo from "./Logo"
import Navigation from "./Navigation"
import Footer from "./Footer"
import { default as defaultTheme } from "../theme"
import SubscribeForm from "./SubscribeForm"

const Layout = ({ theme = defaultTheme, children, mainStyles, shouldShowSubscribe }) => {
  return (
    <ThemeProvider theme={theme}>
      <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
        <Box
          as={"header"}
          sx={{
            position: "relative",
            top: 0,
            py: 3,
            width: "100%",
            // bg: transparentize("background", 0.5),
            // backgroundImage: `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.25) 75%, rgba(255,255,255,0))`,
            // backdropFilter: "blur(16px)",
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

        {!!shouldShowSubscribe && <SubscribeForm />}

        <Footer />
      </Flex>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  shouldShowSubscribe: true,
}

export default Layout
