/* @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import renderToString from "next-mdx-remote/render-to-string"
import { getAllPostsAndCategories } from "../api/posts"
import components from "../../gatsby-plugin-theme-ui/components"
import ProjectsCategoryPage from "../../components/ProjectsCategoryPage"
import ProjectsPostPage from "../../components/ProjectsPostPage"

export async function getStaticProps({ params }) {
  const { slug } = params
  const [posts, categories] = getAllPostsAndCategories("projects")

  const projectPost = categories.find((category) => category.rawSlug === slug)

  // It's a project list
  if (projectPost) {
    const projectPosts = posts.filter((post) => {
      return post.categories[0].rawSlug === slug
    })
    const mdxSource = await renderToString(projectPost.description, {
      components,
    })

    return {
      props: {
        type: "list",
        post: {
          ...projectPost,
          body: mdxSource,
        },
        posts: projectPosts,
      },
    }
  }

  // It's a post
  const post = posts.find((post) => post.rawSlug === slug)

  if (!post) {
    console.error(`Could not find post with slug ${slug}`)
    return {
      notFound: true,
    }
  }

  const mdxSource = await renderToString(post.content, {
    components,
  })

  return {
    props: {
      type: "post",
      post: {
        ...post,
        body: mdxSource,
      },
    },
  }
}

export async function getStaticPaths() {
  const [posts, categories] = getAllPostsAndCategories("projects")

  return {
    paths: [...posts, ...categories].map((item) => {
      return {
        params: {
          slug: item.rawSlug,
        },
      }
    }),
    fallback: false,
  }
}

function ProjectPage(props) {
  switch (props.type) {
    case "list": {
      return <ProjectsCategoryPage {...props} />
    }
    default: {
      return <ProjectsPostPage {...props} />
    }
  }
}

export default ProjectPage
