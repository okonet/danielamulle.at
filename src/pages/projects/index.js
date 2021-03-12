import React from "react"
import { getCategoriesByCollection } from "../api/posts"
import ProjectsPosts from "../../components/ProjectsPosts"

export async function getStaticProps() {
  const categories = getCategoriesByCollection("projects")

  // TODO: Should grouping happening here?

  return {
    props: {
      posts: categories,
    },
  }
}

function PostsPage(props) {
  console.log(props)
  return <ProjectsPosts {...props} />
}

export default PostsPage
