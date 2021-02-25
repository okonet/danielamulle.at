/** @jsx jsx */
import * as React from "react"
import { Portal } from "react-portal"
import { Alert, Button, Close, jsx, Styled } from "theme-ui"
import { useCookies } from "react-cookie"
import { useLocation } from "@reach/router"
import { initializeAndTrack } from "gatsby-plugin-gdpr-cookies"
import { Transition } from "react-transition-group"
import Link from "./Link"

const duration = 750

const transitionStyles = {
  entering: { opacity: 0, transform: "translateY(100%)" },
  entered: { opacity: 1, transform: "none" },
  exiting: { opacity: 0, transform: "translateY(100%)" },
  exited: { opacity: 0 },
}

const facebookPixelCookieName = "gdpr-facebook-pixel"

const cookieOptions = {
  path: "/", // Apply for all pages
  maxAge: 365 * 24 * 60 * 60, // 1 year
}

function CookieConsent({}) {
  const location = useLocation()
  const [visible, setVisible] = React.useState(false)
  const [cookies, setCookie] = useCookies([facebookPixelCookieName])

  const cookie = cookies[facebookPixelCookieName]

  React.useEffect(() => {
    // Show the dialog only if the cookie isn't set
    setVisible(cookie === undefined)
  }, [cookie])

  const handleConsent = () => {
    setCookie(facebookPixelCookieName, true, cookieOptions)
    initializeAndTrack(location)
  }

  const handleRejection = () => {
    setCookie(facebookPixelCookieName, false, cookieOptions)
  }

  return (
    <Transition
      timeout={{
        enter: duration,
        exit: duration,
      }}
      in={visible}
    >
      {(state) =>
        visible && (
          <Portal>
            <Alert
              role="dialog"
              sx={{
                mx: 4,
                mb: 3,
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                bg: "primary",
                zIndex: "dialog",
                boxShadow: "float",
                transition: `all ${duration}ms cubic-bezier(0.68,-0.55,0.27,1.55);`,
                ...transitionStyles[state],
              }}
            >
              <Styled.p sx={{ color: "background", mr: 2, fontSize: 0 }}>
                Hier gibt's nicht nur 🍪Cookie-Rezepte: mehr Infos im{" "}
                <Link
                  sx={{ color: "background", textDecoration: "underline" }}
                  to="/datenschutz"
                >
                  Datenschutz
                </Link>
                :
              </Styled.p>
              <Button
                onClick={handleConsent}
                sx={{ mr: 2, fontSize: 0, py: 1, cursor: "pointer" }}
              >
                Einverstanden
              </Button>

              <Close onClick={handleRejection} ml="auto" mr={-2} />
            </Alert>
          </Portal>
        )
      }
    </Transition>
  )
}

export default CookieConsent
