/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import { getAllPosts, getPostBySlug } from "../api/posts"
import config from "../../../site.config"
import components from "../../gatsby-plugin-theme-ui/components"
import RecipesPost from "../../components/RecipesPost"

export async function getStaticProps({ params }) {
  const { collection, slug } = params
  const post = getPostBySlug(collection, slug)

  if (!post) {
    return {
      notFound: true, // TODO: Remove in favor of fallback: true
    }
  }

  const mdxSource = await renderToString(post.content, { components })
  return {
    props: {
      ...post,
      body: mdxSource,
    },
  }
}

export async function getStaticPaths({ params }) {
  const { collection } = params
  const allPosts = getAllPosts(collection)
  return {
    paths: allPosts.map((post) => {
      const [_, slug] = post.slug.split("/")
      return {
        params: { slug },
      }
    }),
    fallback: false,
  }
}

function RecipesPostPage(props) {
  return <RecipesPost data={{ post: props }} />
}

export default RecipesPostPage
