import { Helmet } from "react-helmet/es/Helmet"
import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "theme-ui"

export default function ThemeUIProvider({ theme, children }) {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Yeseva+One&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

ThemeUIProvider.propTypes = {
  theme: PropTypes.object.isRequired,
}
