/** @jsx jsx */
import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Button, Container, Grid, jsx, Styled } from "theme-ui"
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share"
import Layout from "./layout"
import Link from "./Link"
import { recipesTheme } from "../theme"
import { recipesPath } from "../../paths"
import Tag from "./Tag"
import Group from "react-group"
import Img from "gatsby-image"
import SEO from "./seo"

export default ({ data, pageContext, location }) => {
  const { post, site } = data
  const { body, coverImage, title, categories, timeToCook } = post
  const pageUrl = location.href ? location.href : site.siteMetadata.url
  const mainCategory = categories.find((cat) => !cat.isTag)
  const tags = categories.filter((cat) => cat.isTag)
  const ogImagePath = site.siteMetadata.url + pageContext.ogImage.path
  return (
    <Layout theme={recipesTheme}>
      <SEO title={title} ogImage={pageContext.ogImage} />
      <Img
        fluid={coverImage.childImageSharp.fluid}
        style={{
          position: "relative",
          maxHeight: 500,
        }}
      />
      <Container variant="section">
        <Grid gap={0} columns={[1, 12]}>
          <Box
            as="nav"
            sx={{
              color: "muted",
              fontSize: 0,
              gridColumn: [1, "1 / span 8"],
              "@media print": {
                visibility: "hidden",
              },
            }}
          >
            <Group separator=" → ">
              <Link to={recipesPath}>Alle Rezepte</Link>
              <Link to={mainCategory.slug}>{mainCategory.id}</Link>
            </Group>
          </Box>
          <Styled.h1
            sx={{
              mt: 1,
              gridColumn: [1, "1 / span 12"],
              ":first-letter": { textTransform: "uppercase" },
            }}
          >
            {title}
          </Styled.h1>

          <Box
            sx={{
              gridColumnStart: [1, 1],
              gridColumnEnd: [1, 9],
              "& > p:first-of-type": {
                variant: "textStyles.lead",
              },
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </Box>

          <Box
            as="aside"
            sx={{
              gridColumn: [1, "10 / span 3"],
              gridRow: [4, "3 / span 2"],
            }}
          >
            <Styled.h3>Zubereitungszeit</Styled.h3>
            <Styled.p>{timeToCook}</Styled.p>
            {tags && (
              <>
                <Styled.h3>Kategorien</Styled.h3>
                <Box sx={{ my: 2, mx: -2 }}>
                  <Group as="p" separator=" ">
                    {tags.map((category) => (
                      <Tag key={category.id} sx={{ my: 1 }}>
                        <Link to={category.slug}>{category.id}</Link>
                      </Tag>
                    ))}
                  </Group>
                </Box>
              </>
            )}

            <Box
              sx={{
                "@media print": {
                  display: "none",
                },
              }}
            >
              <Styled.h3>Nährwerte</Styled.h3>
              <Styled.p>
                Du suchst die Nährwertangaben? In{" "}
                <Link to="/posts/2020-07-07-nährwertangaben">
                  diesem Artikel
                </Link>{" "}
                erklärte ich, warum du hier keine findest.
              </Styled.p>
            </Box>

            <Box
              as="nav"
              sx={{
                my: 3,
                "@media print": {
                  display: "none",
                },
              }}
            >
              <Styled.h3 sx={{ mb: 2 }}>Teilen</Styled.h3>
              <Grid
                sx={{
                  gridGap: 2,
                  gridAutoFlow: "column",
                }}
              >
                <EmailShareButton url={pageUrl} subject={title}>
                  <EmailIcon round size={32} />
                </EmailShareButton>
                <FacebookShareButton url={pageUrl} quote={title}>
                  <FacebookIcon round size={32} />
                </FacebookShareButton>
                <TwitterShareButton url={pageUrl} title={title}>
                  <TwitterIcon round size={32} />
                </TwitterShareButton>
                <WhatsappShareButton url={pageUrl} title={title}>
                  <WhatsappIcon round size={32} />
                </WhatsappShareButton>
                <PinterestShareButton url={pageUrl} media={ogImagePath}>
                  <PinterestIcon round size={32} />
                </PinterestShareButton>
                <Button
                  variant="print"
                  sx={{
                    my: 2,
                  }}
                  title="Seite drücken"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.print()
                    }
                  }}
                >
                  🖨
                </Button>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
