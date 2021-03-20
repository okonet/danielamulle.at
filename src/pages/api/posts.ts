import path from "path"
import fs from "fs"
import matter from "gray-matter"
import slug from "slug"
import yaml from "js-yaml"
import { compareDesc } from "date-fns"

const BASE_PATH = path.join(process.cwd(), "public", "content")

export function getCollectionPath(collectionName) {
  return path.join(BASE_PATH, collectionName)
}

const normalizeCategory = (collectionName) => (
  category: Partial<Category>
): Category => {
  const categoryId = category.id ?? category.value
  return <Category>{
    ...category,
    id: categoryId, // TODO: Drop `value` key
    rawSlug: slug(categoryId),
    slug: `/${collectionName}/category/${slug(categoryId)}`,
  }
}

type Category = {
  id: string
  slug: string
  rawSlug: string
  value: string
  label: string
  postCount: number
}

type Post = {
  id: string
  title: string
  slug: string
  rawSlug: string
  date: string
  categories: Array<Category>
  content: string
}

export function getPostBySlug(collectionName, slug): Post {
  const fullPath = path.join(getCollectionPath(collectionName), `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
    },
  })
  const postCategories = data.categories ?? []
  const allCategories = getCategoriesByCollection(collectionName)
  const postCategoriesIds = postCategories.map((tag) => tag.value)
  const categories = allCategories.filter((category) =>
    postCategoriesIds.includes(category.id)
  )

  return <Post>{
    id: slug,
    slug: `/${collectionName}/${slug}`,
    rawSlug: slug,
    ...data,
    categories,
    content,
  }
}

export function getCategoriesByCollection(collectionName): Array<Category> {
  const filePath = path.join(
    getCollectionPath(collectionName),
    `categories.json`
  )
  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)
    return data.categories.map(normalizeCategory(collectionName))
  } catch (e) {
    console.warn(`Could not get categories for collection ${collectionName}`)
    return []
  }
}

export function getAllPostsAndCategories(
  collectionName
): [Array<Post>, Array<Category>] {
  const path = getCollectionPath(collectionName)
  const posts = fs
    .readdirSync(path)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    .map((file) => {
      const slug = file.replace(/\.md$/, "")
      return getPostBySlug(collectionName, slug)
    })
    // Sort posts chronologically
    .sort((postLeft, postRight) => {
      return compareDesc(new Date(postLeft.date), new Date(postRight.date))
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
    return res.status(500).json({ error: "Please specify a collection" })
  }
  const [posts, categories] = getAllPostsAndCategories(collection)
  res.json({
    posts,
    categories,
  })
}
