import { join } from "path"
import fs from "fs"
import matter from "gray-matter"
import yaml from "js-yaml"

const BASE_PATH = "content"

export function getCollectionPath(collectionName) {
  return join(process.cwd(), BASE_PATH, collectionName)
}

const normalizeCategory = (collectionName) => (category) => {
  const categoryId = category.id ?? category.value
  return {
    ...category,
    id: categoryId, // TODO: Maybe keep value/label instead?
    slug: `/${collectionName}/${categoryId}`, // TODO: Add proper slug?
  }
}

export function getPostBySlug(collectionName, slug) {
  const fullPath = join(getCollectionPath(collectionName), `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
    },
  })

  // TODO: Format Date

  return {
    slug: `${collectionName}/${slug}`,
    originalSlug: slug,
    ...data,
    categories: data.categories.map(normalizeCategory(collectionName)),
    content,
  }
}

export function getCategoriesByCollection(collectionName) {
  const posts = getAllPosts(collectionName)
  const filePath = join(getCollectionPath(collectionName), `categories.json`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const data = JSON.parse(fileContents)
  return data.categories
    .map(normalizeCategory(collectionName))
    .map((category) => {
      const postsWithCategory = posts.filter((post) =>
        post.categories.some((cat) => cat.value === category.id)
      )
      return {
        ...category,
        // posts: postsWithCategory,
        postCount: postsWithCategory.length || 0,
      }
    })
}

export function getAllPosts(collectionName) {
  const path = getCollectionPath(collectionName)
  return (
    fs
      .readdirSync(path)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
      .map((file) => {
        const slug = file.replace(/\.md$/, "")
        return getPostBySlug(collectionName, slug)
      })
  )
}

export default async function handler(req, res) {
  const { collection } = req.query
  if (!collection) {
    res.error("Please specify a collection")
  }
  const posts = getAllPosts(collection)
  res.json(posts)
}
