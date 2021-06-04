import { NextApiRequest, NextApiResponse } from "next"
import { Category, getCollectionPath } from "./posts"
import path from "path"
import fs from "fs"

export type Section = {
  slug: string // Acts as ID
  title: string
  theme?: string // TODO: Use union type
  content?: string
  categories?: Array<Category>
}

export function getSection(slug: string): Section {
  const filePath = path.join(getCollectionPath(slug), `categories.json`)

  if (!fs.existsSync(filePath)) {
    throw Error(
      `Could not find section ${slug}. Check if ${filePath} exists...`
    )
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)
    return {
      slug,
      ...data,
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query
  if (!slug) {
    return res.status(500).json({ error: "Please specify a section' slug" })
  }
  if (Array.isArray(slug)) {
    return res.status(500).json({ error: "`slug` must be a string" })
  }
  res.json(getSection(slug))
}
