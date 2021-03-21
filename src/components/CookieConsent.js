/** @jsx jsx */
import * as React from "react"
import { Portal } from "react-portal"
import { Alert, Box, Button, Close, jsx } from "theme-ui"
import { Transition } from "react-transition-group"
import Head from "next/head"
import Link from "./Link"
import useGdprConsent from "./useGdprConsent"

const duration = 750

const transitionStyles = {
  entering: { opacity: 0, transform: "translateY(100%)" },
  entered: { opacity: 1, transform: "none" },
  exiting: { opacity: 0, transform: "translateY(100%)" },
  exited: { opacity: 0 },
}

function CookieConsent({}) {
  const [visible, setVisible] = React.useState(false)
  const [consent, setConsent] = useGdprConsent("gdpr-consent")

  const consentNotGiven = consent === "not-given"
  const allowTracking = consent === "allowed"

  React.useEffect(() => {
    setVisible(consentNotGiven)
  }, [consentNotGiven])

  return (
    <>
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
                variant="cookieDialog"
                sx={{
                  mx: 4,
                  mb: 3,
                  position: "fixed",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  transition: `all ${duration}ms cubic-bezier(0.68,-0.55,0.27,1.55);`,
                  ...transitionStyles[state],
                }}
              >
                <Box as="p">
                  Hier gibt's nicht nur 🍪Cookie-Rezepte: mehr Infos im{" "}
                  <Link to="/datenschutz">Datenschutz</Link>.
                  <Button
                    onClick={() => {
                      setConsent("allowed")
                    }}
                    sx={{
                      display: "inline-block",
                      mr: 2,
                      py: 1,
                      cursor: "pointer",
                    }}
                  >
                    Okay
                  </Button>
                </Box>
                <Close
                  onClick={() => {
                    setConsent("not-allowed")
                  }}
                  ml="auto"
                  mr={-2}
                  sx={{ flexShrink: 0 }}
                />
              </Alert>
            </Portal>
          )
        }
      </Transition>
      {allowTracking && (
        <Head>
          <script async src="https://cdn.splitbee.io/sb.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '175080330711004');
      fbq('track', 'PageView');`,
            }}
          />
        </Head>
      )}
    </>
  )
}

export default CookieConsent
