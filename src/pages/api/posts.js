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

  const allCategories = getCategoriesByCollection(collectionName)
  const postCategoriesIds = data.categories.map((tag) => tag.value)
  const categories = allCategories.filter((category) =>
    postCategoriesIds.includes(category.id)
  )

  // TODO: Format Date

  return {
    slug: `${collectionName}/${slug}`,
    originalSlug: slug,
    ...data,
    categories,
    content,
  }
}

export function getCategoriesByCollection(collectionName) {
  const filePath = join(getCollectionPath(collectionName), `categories.json`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const data = JSON.parse(fileContents)
  return data.categories.map(normalizeCategory(collectionName))
}

export function getAllPostsAndCategories(collectionName) {
  const path = getCollectionPath(collectionName)
  const posts = fs
    .readdirSync(path)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      return getPostBySlug(collectionName, slug)
    })
  // Add post count to matching categories
  const categories = getCategoriesByCollection(collectionName).map(
    (category) => {
      const postsWithCategory = posts.filter((post) =>
        post.categories.some((cat) => cat.id === category.id)
      )
      return {
        ...category,
        // posts: postsWithCategory,
        postCount: postsWithCategory.length || 0,
      }
    }
  )
  return [posts, categories]
}

export default async function handler(req, res) {
  const { collection } = req.query
  if (!collection) {
    res.error("Please specify a collection")
  }
  const [posts, categories] = getAllPostsAndCategories(collection)
  res.json({
    posts,
    categories,
  })
}
