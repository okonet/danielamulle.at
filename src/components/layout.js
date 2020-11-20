/** @jsx jsx */
import React from "react"
import PropTypes from "prop-types"
import { Box, Container, Flex, jsx, Styled, ThemeProvider } from "theme-ui"
import Footer from "./Footer"
import { default as defaultTheme } from "../theme"
import SubscribeForm from "./SubscribeForm"
import Header from "./Header"

const Layout = ({
  theme = defaultTheme,
  children,
  mainStyles,
  shouldShowSubscribe = true,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
        <Header />

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

        {shouldShowSubscribe && (
          <Box as="section" sx={{ bg: "background" }}>
            <Container
              variant="section"
              sx={{
                mt: 4,
                bg: "transparent",
              }}
            >
              <Styled.h2 sx={{ mt: 0, mb: 3 }}>Newsletter</Styled.h2>
              <Styled.p>
                Verpasse keine meiner tollen Tipps & Tricks, interessanten Infos
                & köstlichen Rezepte.
              </Styled.p>
              <SubscribeForm />
            </Container>
          </Box>
        )}

        <Footer />
      </Flex>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
