/* @jsx jsx */
import React from "react"
import { Container, Flex, jsx, Styled } from "theme-ui"
import SEO from "../components/seo"
import Section from "../components/Section"
import CoverImage from "./CoverImage"
import Header from "./Header"
import SubscribeForm from "./SubscribeForm"
import Footer from "./Footer"
import ThemeUIProvider from "./ThemeUIProvider"
// import CookieConsent from "./CookieConsent"
import defaultTheme from "../theme"

const Heading = ({ heading, title }) =>
  heading ? (
    heading
  ) : (
    <Styled.h1 sx={{ variant: "textStyles.pageTitle" }}>{title}</Styled.h1>
  )

export default function PageLayout({
  title,
  heading,
  coverImage,
  coverImageAuthor = "Andrey Okonetchnikov",
  coverImageLink = "https://okonet.ru",
  children,
  theme = defaultTheme,
  blendMode = "screen",
  shouldShowSubscribe = true,
}) {
  return (
    <>
      <SEO title={title} ogImage={!!coverImage} />
      <ThemeUIProvider theme={theme}>
        <Flex
          sx={{ flexDirection: "column", minHeight: "100vh", bg: "background" }}
        >
          <Header />
          <Flex
            as="main"
            sx={{
              flexDirection: "column",
              flexGrow: 1,
              bg: "background",
            }}
          >
            {coverImage ? (
              <CoverImage
                alt={title}
                src={coverImage}
                author={coverImageAuthor}
                url={coverImageLink}
              />
            ) : (
              <Section
                theme={theme}
                blendMode={blendMode}
                sx={{
                  display: "flex",
                  pt: [6, 5],
                  pb: [3, 5],
                  backgroundColor: "headerBg",
                  minHeight: [280, 260, 260],
                  alignItems: "flex-end",
                }}
              >
                <Heading heading={heading} title={title} />
              </Section>
            )}

            <Container variant="section">
              {coverImage && <Heading heading={heading} title={title} />}
              {children}
            </Container>
          </Flex>
          {shouldShowSubscribe && (
            <Section
              theme={theme}
              blendMode={blendMode}
              sx={{
                py: 4,
              }}
            >
              <Styled.h2 sx={{ mt: 0, mb: 3 }}>Newsletter</Styled.h2>
              <Styled.p>
                Verpasse keine meiner tollen Tipps & Tricks, interessanten Infos
                & köstlichen Rezepte.
              </Styled.p>
              <SubscribeForm />
            </Section>
          )}

          <Footer />
        </Flex>
      </ThemeUIProvider>
    </>
  )
}
