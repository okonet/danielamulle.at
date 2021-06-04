/* @jsx jsx */
import { jsx } from "theme-ui"
import Head from "next/head"
import RootThemeProvider from "../components/ThemeUIProvider"
import CookieConsent from "../components/CookieConsent"

export default function CustomApp({ Component, pageProps }) {
  return (
    <RootThemeProvider>
      <Head>
        <link rel="icon" href="/icons/favicon-32x32.png" />
        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon-180x180.png"
        />
      </Head>
      <CookieConsent />
      <Component {...pageProps} />
    </RootThemeProvider>
  )
}
