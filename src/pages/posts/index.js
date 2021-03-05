import React from "react"
import PageLayout from "../../components/PageLayout"
import Content, { title } from "../../../content/sections/blog.mdx"
import { blogTheme } from "../../theme"
import { getAllPosts, getCollectionPath } from "../api/posts"
import Link from "../../components/Link"
import config from "../../../site.config"

export async function getStaticProps({ params }) {
  const posts = getAllPosts(getCollectionPath(config.collections.blog))

  return {
    props: {
      posts,
    },
  }
}

function BlogIndex({ posts }) {
  return (
    <PageLayout title={title} theme={blogTheme}>
      <Content />
      <ol>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`${config.collections.blog}/${post.slug}`}>
              {post.meta.title}
            </Link>
          </li>
        ))}
      </ol>
    </PageLayout>
  )
}

export default BlogIndex
