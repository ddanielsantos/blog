import path from 'node:path'
import fs from 'node:fs/promises'
import matter from 'gray-matter'

type PostData = {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
}

export const getPost = async (filename: string) => {
  const contentPath = path.join(process.cwd(), 'content', filename)
  const file = await fs.readFile(contentPath, 'utf8')
  const { data, content } = matter(file)

  return {
    data: data as PostData,
    content,
  }
}
