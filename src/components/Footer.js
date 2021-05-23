/* @jsx jsx */
import React from "react"
import { footerTheme } from "../theme"
import {
  Box,
  Grid,
  Container,
  jsx,
  Styled,
  ThemeProvider,
  Flex,
} from "theme-ui"
import Group from "react-group"
import Link from "next/link"
import ContactInfo from "./ContactInfo"
import FacebookIcon from "./FacebookIcon"
import InstagramIcon from "./InstagramIcon"
import config from "../../site.config"
import YoutubeIcon from "./YoutubeIcon"

function Footer() {
  const { socialHandle, author, authorDegree } = config
  return (
    <ThemeProvider theme={footerTheme}>
      <Box as="footer" sx={{ flexShrink: 1, bg: "background" }}>
        <Container
          variant="section"
          sx={{ bg: "transparent", color: "secondary", fontSize: 0 }}
        >
          <Box sx={{ display: ["block", "flex"], alignItems: "flex-end" }}>
            <Grid gap={2} sx={{ flex: 1, "> p": { m: 0 }, mb: [3, 0] }}>
              <Styled.p>
                <ContactInfo type="phone" />
              </Styled.p>
              <Styled.p>
                <ContactInfo type="email" />
              </Styled.p>
              <Flex as="p" sx={{ "* + *": { marginLeft: 1 } }}>
                <Styled.a
                  href={`https://facebook.com/${socialHandle}`}
                  title={`Facebook: ${socialHandle}`}
                  sx={{
                    display: "inline-flex",
                    ":hover": {
                      color: "accent",
                    },
                  }}
                >
                  <FacebookIcon width="2em" height="2em" />
                </Styled.a>
                <Styled.a
                  href={`https://instagram.com/${socialHandle}`}
                  title={`Instagram: ${socialHandle}`}
                  sx={{
                    display: "inline-flex",
                    ":hover": {
                      color: "accent",
                    },
                  }}
                >
                  <InstagramIcon width="2em" height="2em" />
                </Styled.a>
                <Styled.a
                  href="https://www.youtube.com/channel/UCv9D25wFLYm-lFJRexwqhoA"
                  title="My YouTube Channel"
                  sx={{
                    display: "inline-flex",
                    ":hover": {
                      color: "accent",
                    },
                  }}
                >
                  <YoutubeIcon width="2em" height="2em" />
                </Styled.a>
              </Flex>
            </Grid>
            <Grid
              gap={2}
              sx={{ textAlign: ["left", "right"], "> p": { m: 0 } }}
            >
              <Styled.p>
                Made with ♡ by{" "}
                <Styled.a href="https://www.component-driven.dev">
                  Component-Driven
                </Styled.a>
              </Styled.p>
              <Styled.p>
                © {authorDegree} {author}, {new Date().getFullYear()}
              </Styled.p>
              <Box
                css={{
                  "@media print": {
                    display: "none",
                  },
                }}
              >
                <Group as="nav" separator=" • ">
                  <Link href="/legal/impressum" passHref>
                    <Styled.a>Impressum</Styled.a>
                  </Link>
                  <Link href="/legal/datenschutz" passHref>
                    <Styled.a>Datenschutz</Styled.a>
                  </Link>
                  <Link href="/legal/agb-und-widerruf" passHref>
                    <Styled.a>AGB & Widerruf</Styled.a>
                  </Link>
                </Group>
              </Box>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Footer
