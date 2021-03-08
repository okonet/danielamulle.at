/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import {
  getAllPosts,
  getCategoriesByCollection,
  getPostBySlug,
} from "../api/posts"
import components from "../../gatsby-plugin-theme-ui/components"
import PostPage from "../../gatsby-theme-content-collections/components/PostPage"

export async function getStaticProps({ params }) {
  const { collection, slug } = params
  const post = getPostBySlug(collection, slug)
  const collectionCategories = getCategoriesByCollection(collection)

  if (!post) {
    return {
      notFound: true, // TODO: Remove in favor of fallback: true
    }
  }

  let matchTagsWithCategory = (post, category) => {
    return post.categories.find((tag) => tag.id === category.id)
  }

  const tags = collectionCategories.filter((category) => {
    const matchedTag = matchTagsWithCategory(post, category)
    return matchedTag && category.isTag
  })

  const category =
    collectionCategories.find((category) => {
      const matchedTag = matchTagsWithCategory(post, category)
      return matchedTag && !category.isTag
    }) ?? null

  const mdxSource = await renderToString(post.content, { components })
  return {
    props: {
      collection,
      post: {
        ...post,
        body: mdxSource,
        category,
        tags,
      },
    },
  }
}

export async function getStaticPaths() {
  const collections = [
    "posts",
    "recipes",
    // "projects",
    // "testimonials",
    // "resources",
  ]

  const collectionsWithPosts = collections.flatMap((collection) => {
    const allPosts = getAllPosts(collection)
    return allPosts.map((post) => {
      const [_, slug] = post.slug.split("/")
      return {
        params: {
          collection,
          slug,
        },
      }
    })
  })

  return {
    paths: collectionsWithPosts,
    fallback: false,
  }
}

function SinglePostPage(props) {
  return <PostPage {...props} />
}

export default SinglePostPage
