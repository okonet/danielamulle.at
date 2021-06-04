/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { getAllPostsAndCategories, getPostBySlug } from "../../../../api/posts"
import config from "../../../../../../site.config"
import SocialImage from "../../../../../components/SocialImage"

export async function getStaticProps({ params }) {
  const { collection, slug, format: pageType } = params
  const post = getPostBySlug(collection, slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
      post,
      pageType,
    },
  }
}

export async function getStaticPaths() {
  const allFormats = ["instagram", "instagramWithTitle", "ogImage"]
  const collectionsWithPosts = Object.values(config.collections)
    .filter((collection) => collection !== config.collections.projects)
    .flatMap((collection) => {
      const [allPosts] = getAllPostsAndCategories(collection)
      return allPosts.flatMap((post) => {
        return allFormats.map((format) => ({
          params: {
            collection,
            slug: post.rawSlug,
            format,
          },
        }))
      })
    })

  return {
    paths: collectionsWithPosts,
    fallback: true,
  }
}

export default function PreviewPostPage({ post, pageType }) {
  if (post) {
    const { coverImage, author, title } = post

    switch (pageType) {
      case "ogImage": {
        return (
          <SocialImage
            author={author}
            title={title}
            image={coverImage}
            width={1012}
            height={506}
          />
        )
      }
      case "instagramWithTitle": {
        return (
          <SocialImage
            author={author}
            title={title}
            image={coverImage}
            width={1080}
            height={1080}
          />
        )
      }
      case "instagram": {
        return (
          <SocialImage
            title={undefined}
            image={coverImage}
            width={1080}
            height={1080}
          />
        )
      }
      default: {
        return `Unknown page type "${pageType}".`
      }
    }
  }
}
