import React from "react"
import {
  Colors,
  Spacing,
  Swatch,
  Swatches,
  SwatchToken,
  Typography,
} from "@component-driven/react-design-tokens"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import theme, * as themes from "../theme"
import logo from "../images/logo/logo.png"
import logo2x from "../images/logo/logo@2x.png"
import logoSVG from "../images/logo/logo.svg"
import { graphql, useStaticQuery } from "gatsby"
import SocialImage from "../components/SocialImage"
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
    <Box
      sx={{
        p: 5,
        bg: "#fff",
      }}
    >
      <Container variant="full" sx={{ maxWidth: 1200 }}>
        <Grid gap={4}>
          <Styled.h1>Logos</Styled.h1>
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
          <Styled.h1>Spacing</Styled.h1>
          <Spacing theme={theme} />

          <Styled.h1>Typography</Styled.h1>
          <Typography theme={theme} />

          <Styled.h1>Palette</Styled.h1>
          <Colors theme={{ colors: themes.palette }} />

          {Object.keys(themes)
            .filter((t) => t !== "palette")
            .map((sectionName) => (
              <React.Fragment key={sectionName}>
                <Styled.h2>{sectionName}</Styled.h2>
                <Colors theme={themes[sectionName]} />
              </React.Fragment>
            ))}

          <Styled.h1>Social Images</Styled.h1>
        </Grid>
        <Grid gap={2} columns={2}>
          {recipes.nodes.map(({ id, slug, title, socialImage }) => (
            <Box key={id}>
              <Box sx={{ mb: 3 }}>
                <Styled.h2>{title}</Styled.h2>
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
    </Box>
  )
}
