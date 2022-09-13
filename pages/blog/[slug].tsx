import github from 'remark-gfm'
import emoji from 'remark-emoji'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import { getPost } from "../../src/lib/getPost"
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { getPostsFilenames } from "../../src/lib/getPostsFileNames"
import { getSlugFromFilename } from "../../src/lib/getSlugFromFilename"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"

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
type PostData = Awaited<ReturnType<typeof getPost>>['data']

export const getStaticProps: GetStaticProps<{ data: { content: string, meta: PostData } }> = async (context) => {
  if(!context.params?.slug) {
    return {
      notFound: true
    }
  }
  
  const { content, data } = await getPost(context.params.slug + '.md')

  return {
    props: {
      data: { content, meta: data }
    }
  }
}

export default function BlogPost({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ReactMarkdown
      remarkPlugins={[emoji, github]}
      components={{ code: CodeBlock }}
    >
      {data.content}
    </ReactMarkdown>
  )
}
