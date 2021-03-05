import React from "react"
import PageLayout from "../../components/PageLayout"
import Content, { title } from "../../../content/sections/blog.mdx"
import { blogTheme } from "../../theme"
import { getAllPosts, sectionDirectory } from "../api/posts"
import Link from "../../components/Link"

export async function getStaticProps({ params }) {
  const posts = getAllPosts(sectionDirectory)

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
          <li>
            <Link key={post.slug} href={`posts/${post.slug}`}>
              {post.meta.title}
            </Link>
          </li>
        ))}
      </ol>
    </PageLayout>
  )
}

export default BlogIndex
