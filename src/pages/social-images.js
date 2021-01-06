/* @jsx jsx */
import React from "react"
import {
  Box,
  Container,
  Flex,
  Grid,
  Label,
  Radio,
  jsx,
  Styled,
  Button,
} from "theme-ui"
import theme from "../theme"
import { graphql, useStaticQuery } from "gatsby"
import Link from "../components/Link"
import ThemeUIProvider from "../components/ThemeUIProvider"

const initialVersion = 2

const IMAGE_TYPES = [
  {
    name: "instagram",
    width: 1080,
    height: 1080,
  },
  {
    name: "instagramWithTitle",
    width: 1080,
    height: 1080,
  },
  {
    name: "ogImage",
    width: 1012,
    height: 506,
  },
]

function Post({ id, title, slug, imageType = "instagram", version }) {
  const selectedImageType = IMAGE_TYPES.find((type) => type.name === imageType)
  const { width, height } = selectedImageType
  const queryParams = new URLSearchParams("")
  queryParams.set("width", width)
  queryParams.set("height", height)
  queryParams.set("version", version)
  queryParams.set("url", `https://danielamulle.at${slug}?${imageType}`)
  return (
    <Box key={id}>
      <Box sx={{ mb: 3 }}>
        <Styled.h2 sx={{ m: 0 }}>{title}</Styled.h2>
        <Link to={`${slug}?${imageType}`}>{slug}</Link>
      </Box>
      <img
        alt={`Instagram Image for ${title}`}
        src={`https://www.component-driven.dev/api/screenshot?${queryParams.toString()}`}
        width={width / 2}
        height={height / 2}
      />
    </Box>
  )
}

export default ({ location, navigate }) => {
  const { posts } = useStaticQuery(
    graphql`
      query {
        posts: allPost {
          nodes {
            ...PostMeta
          }
        }
      }
    `
  )
  const searchParams = new URLSearchParams(location.search)
  const selectedPostSlug = searchParams.get("post")
  const version = searchParams.get("v") || initialVersion
  const imageType = searchParams.get("type") || IMAGE_TYPES[0].name
  const selectedPost = posts.nodes.find(
    (post) => post.slug === selectedPostSlug
  )
  const handleFormChange = (event) => {
    const value = event.target.value
    searchParams.set("type", value)
    const nextUrl =
      value !== ""
        ? `${location.pathname}?${searchParams.toString()}`
        : location.pathname
    navigate(nextUrl, {
      replace: true,
    })
  }
  const handleRefresh = (event) => {
    event.preventDefault()
    searchParams.set("v", Date.now())
    const nextUrl = `${location.pathname}?${searchParams.toString()}`
    navigate(nextUrl, {
      replace: true,
    })
  }
  return (
    <ThemeUIProvider theme={theme}>
      <Container
        variant="full"
        sx={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Grid gap={4} sx={{ py: 0, height: "100%", width: "100%" }}>
          <Styled.h1>Social Images</Styled.h1>
          <Flex sx={{ overflow: "hidden", width: "100%" }}>
            <Flex
              as="aside"
              sx={{
                mr: 4,
                maxWidth: 200,
                maxHeight: "100%",
                overflow: "auto",
              }}
            >
              <Styled.ul sx={{ flexDirection: "column" }}>
                {posts.nodes.map(({ slug, title }) => (
                  <Styled.li>
                    <Link to={`?post=${slug}`}>{title}</Link>
                  </Styled.li>
                ))}
              </Styled.ul>
            </Flex>
            <Flex
              as="main"
              sx={{
                flexGrow: 1,
                flexDirection: "column",
              }}
            >
              {selectedPost ? (
                <>
                  <Flex
                    as="form"
                    onChange={handleFormChange}
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {IMAGE_TYPES.map((type) => {
                      const isChecked = imageType === type.name
                      return (
                        <Label sx={{ width: "auto", mr: 4 }}>
                          <Radio
                            name={type.name}
                            value={type.name}
                            checked={isChecked}
                          />
                          {type.name}
                        </Label>
                      )
                    })}
                    <Button type="button" onClick={handleRefresh}>
                      Refresh
                    </Button>
                  </Flex>
                  <Post
                    {...selectedPost}
                    imageType={imageType}
                    version={version}
                  />
                </>
              ) : (
                <Styled.p>Please select a post</Styled.p>
              )}
            </Flex>
          </Flex>
        </Grid>
      </Container>
    </ThemeUIProvider>
  )
}
