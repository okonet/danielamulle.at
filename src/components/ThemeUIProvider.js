import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider, Styled } from "theme-ui"
import defaultTheme from "../theme"

export default function ThemeUIProvider({ theme = defaultTheme, children }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Yeseva+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Styled.root>{children}</Styled.root>
      </ThemeProvider>
    </>
  )
}

ThemeUIProvider.propTypes = {
  theme: PropTypes.object.isRequired,
}
