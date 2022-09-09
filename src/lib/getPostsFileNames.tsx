import fs from 'node:fs'
import path from 'node:path'

const contentPath = path.join(process.cwd(), 'content')

export const getPostsFilenames = (): string[] => {
  return fs.readdirSync(contentPath)
}
