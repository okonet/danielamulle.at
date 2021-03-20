import * as React from "react"
import { useCookies } from "react-cookie"

declare global {
  var fbq: (type: string, payload: string) => void
}

const defaultCookieName = "gdpr-consent"

const defaultCookieOptions = {
  path: "/", // Apply for all pages
  maxAge: 365 * 24 * 60 * 60, // 1 year
}

const TRUE = "1"
const FALSE = "0"

export default function useGdprConsent(
  options: {
    cookieName?: string
    cookieOptions?: object
  } = {}
): {
  trackingAllowed: boolean
  consentGiven: boolean
  setConsent: (value: boolean) => void
} {
  const {
    cookieName = defaultCookieName,
    cookieOptions = defaultCookieOptions,
  } = options
  const [cookies, setCookie] = useCookies([cookieName])

  const consentCookie = cookies[cookieName]
  const trackingAllowed = consentCookie === TRUE

  const setConsent = React.useCallback(
    (value) => {
      const cookieValue = value ? TRUE : FALSE
      setCookie(cookieName, cookieValue, cookieOptions)
    },
    [cookieName, cookieOptions]
  )

  return {
    consentGiven: consentCookie === undefined,
    setConsent,
    trackingAllowed,
  }
}
