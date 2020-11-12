/* @jsx jsx */
import React from "react"
import { footerTheme } from "../theme"
import { Box, Container, jsx, Styled, ThemeProvider } from "theme-ui"
import Group from "react-group"
import Link from "./Link"
import { graphql, useStaticQuery } from "gatsby"
import ContactInfo from "./ContactInfo"
import { Grid } from "@theme-ui/components"
import FacebookIcon from "./FacebookIcon"
import InstagramIcon from "./InstagramIcon"

function Footer() {
  const { site } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          title
          author
          authorDegree
          socialHandle
        }
      }
    }
  `)
  return (
    <ThemeProvider theme={footerTheme}>
      <Box as="footer" sx={{ flexShrink: 1, bg: "background" }}>
        <Container
          variant="section"
          sx={{ bg: "transparent", color: "secondary", fontSize: 0 }}
        >
          <Box sx={{ display: ["block", "flex"], alignItems: "flex-end" }}>
            <Grid gap={1} sx={{ flex: 1, "> p": { m: 0 } }}>
              <Styled.p>
                <ContactInfo type="phone" />
              </Styled.p>
              <Styled.p>
                <ContactInfo type="email" />
              </Styled.p>
              <Styled.p>
                <Styled.a
                  href={`https://facebook.com/${site.siteMetadata.socialHandle}`}
                >
                  <FacebookIcon /> {site.siteMetadata.socialHandle}
                </Styled.a>
              </Styled.p>
              <Styled.p>
                <Styled.a
                  href={`https://instagram.com/${site.siteMetadata.socialHandle}`}
                >
                  <InstagramIcon /> {site.siteMetadata.socialHandle}
                </Styled.a>
              </Styled.p>
            </Grid>
            <Grid
              gap={2}
              sx={{ textAlign: ["left", "right"], "> p": { m: 0 } }}
            >
              <Styled.p>
                Made with ♡ by{" "}
                <Styled.a href="https://component-driven.io">
                  Component-Driven
                </Styled.a>
              </Styled.p>
              <Styled.p>
                © {site.siteMetadata.authorDegree} {site.siteMetadata.author},{" "}
                {new Date().getFullYear()}
              </Styled.p>
              <Box
                css={{
                  "@media print": {
                    display: "none",
                  },
                }}
              >
                <Group as="nav" separator=" • ">
                  <Link to="/impressum">Impressum</Link>
                  <Link to="/datenschutz">Datenschutz</Link>
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
