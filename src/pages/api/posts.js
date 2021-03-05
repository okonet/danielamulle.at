import { join } from "path"
import fs from "fs"
import matter from "gray-matter"
import yaml from "js-yaml"

const BASE_PATH = "content"

export function getCollectionPath(collectionName) {
  return join(process.cwd(), BASE_PATH, collectionName)
}

export function getPostBySlug(collectionName, slug) {
  const fullPath = join(getCollectionPath(collectionName), `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
    },
  })

  // TODO: Convert categories to the proper schema
  // TODO: Format Date

  return {
    slug: `${collectionName}/${slug}`,
    originalSlug: slug,
    ...data,
    categories: data.categories.map((category) => ({
      ...category,
      id: category.value, // TODO: Maybe keep value/label instead?
      slug: category.value, // TODO: Add proper slug
    })),
    content,
  }
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
