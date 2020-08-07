/* @jsx jsx */
import React from "react"
import { footerTheme } from "../theme"
import { jsx, Box, Container, Styled, ThemeProvider } from "theme-ui"
import Group from "react-group"
import Link from "./Link"
import { graphql, useStaticQuery } from "gatsby"
import MailIcon from "./MailIcon"
import PhoneIcon from "./PhoneIcon"

function Footer() {
  const { site } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          title
          author
          authorDegree
          phone
          email
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
            <Box sx={{ flex: 1 }}>
              <Styled.p>
                <PhoneIcon width={16} sx={{ mr: 1, mb: -1 }} />
                <Styled.a href={`tel:${site.siteMetadata.phone}`}>
                  {site.siteMetadata.phone}
                </Styled.a>
                <br />
                <MailIcon width={16} sx={{ mr: 1, mb: -1 }} />
                <Styled.a href={`mailto:${site.siteMetadata.email}`}>
                  {site.siteMetadata.email}
                </Styled.a>
                <br />© {site.siteMetadata.authorDegree}{" "}
                {site.siteMetadata.author}, {new Date().getFullYear()}
              </Styled.p>
            </Box>
            <Box sx={{ textAlign: ["left", "right"] }}>
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
              <Styled.p>
                Made with ♡ by{" "}
                <Styled.a href="https://component-driven.io">
                  Component-Driven
                </Styled.a>
              </Styled.p>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Footer
