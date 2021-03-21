import * as React from "react"
import { useCookies } from "react-cookie"
import { CookieSetOptions } from "universal-cookie"

const defaultCookieOptions: Partial<CookieSetOptions> = {
  path: "/", // Apply for all pages
  maxAge: 365 * 24 * 60 * 60, // set for  1 year
}

type Consent = "not-given" | "allowed" | "not-allowed"

export default function useGdprConsent(
  cookieName: string,
  options?: CookieSetOptions
): [consent: Consent, setConsent: (value: Consent) => void] {
  const cookieOptions = { ...defaultCookieOptions, ...options }
  const [cookies, setCookie, removeCookie] = useCookies([cookieName])
  const cookieValue: Consent = cookies[cookieName]

  const setConsent = React.useCallback(
    (value) => {
      if (value === "not-given") {
        removeCookie(cookieName)
      } else {
        setCookie(cookieName, value, cookieOptions)
      }
    },
    [cookieName, cookieOptions]
  )

  return [cookieValue === undefined ? "not-given" : cookieValue, setConsent]
}
