import github from 'remark-gfm'
import emoji from 'remark-emoji'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import { getPost } from "../../src/lib/getPost"
import { GetStaticPaths, GetStaticProps } from "next"
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { getPostsFilenames } from "../../src/lib/getPostsFileNames"
import { getSlugFromFilename } from "../../src/lib/getSlugFromFilename"

const Code = dynamic(() => import('./Code'), { ssr: false })

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getPostsFilenames()

  return {
    paths: filenames.map(name => {
      return {
        params: { slug: getSlugFromFilename(name) }
      }
    }),
    fallback: false
  }
}

const CodeBlock: CodeComponent = ({ children, inline, className }) => {
  const language = !className ? 'bash' : className.split('-')[1]
  if (inline) return <code>{children}</code>

  return (
    <Code language={language} children={String(children)}/>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if(!context.params?.slug) {
    return {
      notFound: true
    }
  }
  
  const { content } = await getPost(context.params.slug + '.md')

  return {
    props: {
      data: { content }
    }
  }
}

export default function BlogPost({ data }) {
  return (
    <ReactMarkdown
      remarkPlugins={[emoji, github]}
      components={{ code: CodeBlock }}
    >
      {data.content}
    </ReactMarkdown>
  )
}
