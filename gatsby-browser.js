import * as React from "react"
import { CookiesProvider } from "react-cookie"

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  return location.search === "" // Scroll to top only when we're not searching
}

export const wrapRootElement = ({ element }) => {
  return <CookiesProvider>{element}</CookiesProvider>
}
