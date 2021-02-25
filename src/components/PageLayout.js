/* @jsx jsx */
import React from "react"
import { useLocation } from "@reach/router"
import { Container, Flex, jsx, Styled } from "theme-ui"
import SEO from "../components/seo"
import Section from "../components/Section"
import SocialImage from "./SocialImage"
import CoverImage from "./CoverImage"
import Header from "./Header"
import SubscribeForm from "./SubscribeForm"
import Footer from "./Footer"
import ThemeUIProvider from "./ThemeUIProvider"
import CookieConsent from "./CookieConsent"

const Heading = ({ heading, title }) =>
  heading ? (
    heading
  ) : (
    <Styled.h1 sx={{ variant: "textStyles.pageTitle" }}>{title}</Styled.h1>
  )

export default function PageLayout({
  author,
  title,
  heading,
  socialImage,
  coverImage,
  coverImageAuthor = "Andrey Okonetchnikov",
  coverImageLink = "https://okonet.ru",
  children,
  theme = {},
  blendMode = "screen",
  shouldShowSubscribe = true,
}) {
  const { search } = useLocation()
  if (search.includes("ogImage")) {
    return (
      <SocialImage
        author={author}
        title={title}
        image={socialImage}
        width={1012}
        height={506}
      />
    )
  }
  if (search.includes("instagramWithTitle")) {
    return (
      <SocialImage
        author={author}
        title={title}
        image={socialImage}
        width={1080}
        height={1080}
      />
    )
  }
  if (search.includes("instagram")) {
    return (
      <SocialImage
        title={null}
        image={socialImage}
        width={1080}
        height={1080}
      />
    )
  }

  return (
    <>
      <SEO title={title} ogImage={!!coverImage} />
      <ThemeUIProvider theme={theme}>
        <CookieConsent />
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
                fluid={coverImage.childImageSharp.fluid}
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
