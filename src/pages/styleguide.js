import React from "react"
import Helmet from "react-helmet"
import {
  Colors,
  Spacing,
  Swatch,
  Swatches,
  SwatchToken,
  Typography,
} from "@component-driven/react-design-tokens"
import { Box, Container, Grid, Styled } from "theme-ui"
import theme, * as themes from "../theme"
import logo from "../images/logo/logo.png"
import logo2x from "../images/logo/logo@2x.png"
import logoSVG from "../images/logo/logo.svg"
import { graphql, useStaticQuery } from "gatsby"
import Link from "../components/Link"

const version = 2

export default () => {
  const { recipes } = useStaticQuery(
    graphql`
      query {
        recipes: allPost(filter: { collection: { eq: "recipes" } }) {
          nodes {
            ...PostMeta
            socialImage: coverImage {
              childImageSharp {
                fixed(height: 1080) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `
  )
  return (
    <Container variant="full">
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Yeseva+One&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Grid gap={4} sx={{ py: 4 }}>
        <Styled.h1>Styleguide</Styled.h1>
        <Styled.h2>Logos</Styled.h2>
        <Grid gap={4}>
          <Swatches
            theme={theme}
            items={{
              png: logo,
              "png@2x": logo2x,
              svg: logoSVG,
            }}
          >
            {(token, value) => (
              <Swatch token={token} value={value} key={token}>
                <Grid
                  sx={{
                    gridTemplateColumns: "100px 1fr",
                    alignItems: "center",
                  }}
                >
                  <SwatchToken>{token}</SwatchToken>
                  <Box
                    as="img"
                    src={value}
                    sx={{
                      maxWidth: 400,
                    }}
                  />
                </Grid>
              </Swatch>
            )}
          </Swatches>
        </Grid>
        <Styled.h2>Spacing</Styled.h2>
        <Spacing theme={theme} />

        <Styled.h2>Typography</Styled.h2>
        <Typography theme={theme} />

        <Styled.h2>Palette</Styled.h2>
        <Colors theme={{ colors: themes.palette }} />

        {Object.keys(themes)
          .filter((t) => t !== "palette")
          .map((sectionName) => (
            <React.Fragment key={sectionName}>
              <Styled.h2>{sectionName}</Styled.h2>
              <Colors theme={themes[sectionName]} />
            </React.Fragment>
          ))}

        <Styled.h2>Social Images</Styled.h2>
        {recipes.nodes.map(({ id, slug, title, socialImage }) => (
          <Box key={id}>
            <Box sx={{ mb: 3 }}>
              <Styled.h3>{title}</Styled.h3>
              <Link to={slug + "?instagram"}>{slug}</Link>
            </Box>
            <img
              alt={`Instagram Image for ${title}`}
              src={`https://component-driven.dev/api/screenshot?v=${version}&width=1080&height=1080&url=https://danielamulle.at${slug}?instagram`}
              width={1080 / 2}
              height={1080 / 2}
            />
          </Box>
        ))}
      </Grid>
    </Container>
  )
}
