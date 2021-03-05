import { join } from "path"
import fs from "fs"
import matter from "gray-matter"
import yaml from "js-yaml"

export const sectionDirectory = join(process.cwd(), "content", "recipes")

export function getDocBySlug(path, slug) {
  const fullPath = join(path, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
    },
  })

  return { slug, meta: data, content }
}

export function getAllPosts(path) {
  return (
    fs
      .readdirSync(path)
      // Only include md(x) files
      .filter((path) => /\.mdx?$/.test(path))
      .map((file) => getDocBySlug(path, file.replace(/\.md$/, "")))
  )
}

export default async function handler(req, res) {
  // const posts = getDocBySlug({ req, res });
  // res.json(posts);
}
