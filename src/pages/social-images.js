/* @jsx jsx */
import React from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  jsx,
  Label,
  Radio,
  Styled,
} from "theme-ui"
import { useRouter } from "next/router"
import theme from "../theme"
import Link from "../components/Link"
import ThemeUIProvider from "../components/ThemeUIProvider"
import { getAllPostsAndCategories } from "./api/posts"
import config from "../../site.config"

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

export async function getStaticProps() {
  const posts = Object.values(config.collections).flatMap((collection) => {
    const [posts] = getAllPostsAndCategories(collection)
    return posts
  })

  return {
    props: {
      posts,
    },
  }
}

function Post({ title, slug, imageType = "instagram", version }) {
  const selectedImageType = IMAGE_TYPES.find((type) => type.name === imageType)
  const { width, height } = selectedImageType
  const queryParams = new URLSearchParams("")
  queryParams.set("width", width)
  queryParams.set("height", height)
  queryParams.set("version", version)
  queryParams.set("url", `https://danielamulle.at${slug}?${imageType}`)
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Styled.h2 sx={{ m: 0 }}>{title}</Styled.h2>
        <Link to={`${slug}?${imageType}`}>{slug}</Link>
      </Box>
      <img
        alt={`Instagram Image for ${title}`}
        src={`https://shotter.component-driven.dev/api/screenshot?${queryParams.toString()}`}
        width={width / 2}
        height={height / 2}
      />
    </Box>
  )
}

export default function SocialImagesPage({ posts }) {
  const { query, replace } = useRouter()
  const selectedPostSlug = query.post
  const version = query.v || initialVersion
  const imageType = query.type || IMAGE_TYPES[0].name
  const selectedPost = posts.find((post) => post.slug === selectedPostSlug)

  const handleFormChange = (event) => {
    replace({
      query: {
        ...query,
        type: event.target.value,
      },
    })
  }

  const handleRefresh = (event) => {
    event.preventDefault()
    replace({
      query: {
        ...query,
        v: Date.now(),
      },
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
                {posts.map(({ slug, title }) => (
                  <Styled.li key={slug}>
                    <Link to={`/social-images?post=${slug}`}>{title}</Link>
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
                    sx={{
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {IMAGE_TYPES.map((type) => {
                      const isChecked = imageType === type.name
                      return (
                        <Label key={type.name} sx={{ width: "auto", mr: 4 }}>
                          <Radio
                            name={type.name}
                            value={type.name}
                            checked={isChecked}
                            onChange={handleFormChange}
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
