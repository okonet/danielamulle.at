/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import { getAllPostsAndCategories, getPostBySlug } from "../api/posts"
import components from "../../gatsby-plugin-theme-ui/components"
import config from "../../../site.config"
import ProjectsCategoryPage from "../../components/ProjectsCategoryPage"

export async function getStaticProps({ params }) {
  const { slug } = params
  const collection = config.collections.projects
  const post = getPostBySlug(collection, slug)

  if (!post) {
    console.error(`Could not find project with slug ${slug}`)
  }

  const [posts] = getAllPostsAndCategories(slug)

  const mdxSource = await renderToString(post.content, { components })
  return {
    props: {
      collection,
      post: {
        ...post,
        body: mdxSource,
      },
      posts,
    },
  }
}

export async function getStaticPaths() {
  const [posts] = getAllPostsAndCategories(config.collections.projects)

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.rawSlug,
        },
      }
    }),
    fallback: false,
  }
}

function ProjectPage(props) {
  return <ProjectsCategoryPage {...props} />
}

export default ProjectPage
