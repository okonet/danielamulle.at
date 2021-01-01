/* @jsx jsx */
import React from "react"
import {
  Colors,
  Spacing,
  Swatch,
  Swatches,
  SwatchToken,
  SwatchValue,
  Typography,
} from "@component-driven/react-design-tokens"
import { Box, Container, Grid, jsx, Styled } from "theme-ui"
import theme, * as themes from "../theme"
import logo from "../images/logo/logo.png"
import logo2x from "../images/logo/logo@2x.png"
import logoSVG from "../images/logo/logo.svg"
import { graphql, useStaticQuery } from "gatsby"
import Link from "../components/Link"
import PostCard from "../components/PostCard"
import ThemeUIProvider from "../components/ThemeUIProvider"

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
    <ThemeUIProvider theme={theme}>
      <Container variant="full">
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

          <Styled.h2>Font families</Styled.h2>
          <Styled.p>Following custom fonts are being used:</Styled.p>
          <Styled.ul sx={{ fontSize: 5 }}>
            <Styled.li>
              <Styled.a
                href="https://fonts.google.com/specimen/IBM+Plex+Mono?query=IBM+Plex+Mono"
                sx={{
                  fontFamily: "body",
                }}
              >
                IBM Plex Mono
              </Styled.a>
            </Styled.li>
            <Styled.li>
              <Styled.a
                href="https://fonts.google.com/specimen/Yeseva+One?query=Yeseva+One"
                sx={{
                  fontFamily: "heading",
                }}
              >
                Yeseva One
              </Styled.a>
            </Styled.li>
          </Styled.ul>
          <Styled.p>Following font families are defined:</Styled.p>
          <Swatches theme={theme} items={theme.fonts}>
            {(token, value) => (
              <Swatch token={token} value={value} key={token}>
                <Grid
                  sx={{
                    gridTemplateColumns: "100px 1fr",
                    alignItems: "center",
                  }}
                >
                  <SwatchToken>{token}</SwatchToken>
                  <SwatchValue>{value}</SwatchValue>
                </Grid>
              </Swatch>
            )}
          </Swatches>

          <Styled.h2>Text styles</Styled.h2>
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

          <Styled.h2>Post Card</Styled.h2>

          <Grid columns={[1, 2, 3]} gap={2}>
            <PostCard
              coverImage={recipes.nodes[0].coverImage}
              title={recipes.nodes[0].title}
              slug={recipes.nodes[0].slug}
            />
            <PostCard
              coverImage={recipes.nodes[1].coverImage}
              title={recipes.nodes[1].title}
              slug={recipes.nodes[1].slug}
              author="Daniela Mulle"
            />
            <PostCard
              coverImage={recipes.nodes[3].coverImage}
              title={recipes.nodes[3].title}
              slug={recipes.nodes[3].slug}
              date="2020-12-12"
            />
            <PostCard
              coverImage={recipes.nodes[5].coverImage}
              title={recipes.nodes[5].title}
              slug={recipes.nodes[5].slug}
              author="Daniela Mulle"
              date="2020-12-12"
            />
            <PostCard
              disabled
              coverImage={recipes.nodes[5].coverImage}
              title={recipes.nodes[5].title}
              slug={recipes.nodes[5].slug}
              author="Daniela Mulle"
              date="2020-12-12"
            />
            <PostCard disabled slug={"/"} date="2020-12-12" />
          </Grid>

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
    </ThemeUIProvider>
  )
}
