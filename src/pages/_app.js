/* @jsx jsx */
import { jsx } from "theme-ui"
import RootThemeProvider from "../components/ThemeUIProvider"

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <RootThemeProvider>
        <Component {...pageProps} />
      </RootThemeProvider>
    </>
  )
}

export default CustomApp
