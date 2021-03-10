import { join } from "path"
import fs from "fs"
import matter from "gray-matter"
import slug from "slug"

const BASE_PATH = "content"

export function getCollectionPath(collectionName) {
  return join(process.cwd(), BASE_PATH, collectionName)
}

const normalizeCategory = (collectionName) => (category) => {
  const categoryId = category.id ?? category.value
  return {
    ...category,
    id: categoryId, // TODO: Drop `value` key
    slug: `/${collectionName}/category/${slug(categoryId)}`,
  }
}

export function getPostBySlug(
  collectionName,
  slug,
  options = { locale: "en-US" }
) {
  const fullPath = join(getCollectionPath(collectionName), `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const postCategories = data.categories ?? []
  const allCategories = getCategoriesByCollection(collectionName)
  const postCategoriesIds = postCategories.map((tag) => tag.value)
  const categories = allCategories.filter((category) =>
    postCategoriesIds.includes(category.id)
  )

  return {
    slug: `/${collectionName}/${slug}`,
    rawSlug: slug,
    ...data,
    rawDate: data.date,
    date: new Intl.DateTimeFormat(options.locale, {
      dateStyle: "long",
    }).format(data.date),
    categories,
    content,
  }
}

export function getCategoriesByCollection(collectionName) {
  const filePath = join(getCollectionPath(collectionName), `categories.json`)
  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)
    return data.categories.map(normalizeCategory(collectionName))
  } catch (e) {
    console.warn(`Could not get categories for collection ${collectionName}`)
    return []
  }
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
        posts: postsWithCategory,
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
