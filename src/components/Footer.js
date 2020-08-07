/* @jsx jsx */
import React from "react"
import { footerTheme } from "../theme"
import { Box, Container, jsx, Styled, ThemeProvider } from "theme-ui"
import Group from "react-group"
import Link from "./Link"
import { graphql, useStaticQuery } from "gatsby"
import ContactInfo from "./ContactInfo"

function Footer() {
  const { site } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          title
          author
          authorDegree
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
                <ContactInfo type="phone" />
                <br />
                <ContactInfo type="email" />
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
