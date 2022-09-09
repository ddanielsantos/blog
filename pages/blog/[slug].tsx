import github from 'remark-gfm'
import emoji from 'remark-emoji'
import ReactMarkdown from 'react-markdown'
import { getPost } from "../../src/lib/getPost"
import { GetStaticPaths, GetStaticProps } from "next"
import { getPostsFilenames } from "../../src/lib/getPostsFileNames"
import { getSlugFromFilename } from "../../src/lib/getSlugFromFilename"

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getPostsFilenames()
  console.log(filenames)

  return {
    paths: filenames.map(name => {
      return {
        params: { slug: getSlugFromFilename(name) }
      }
    }),
    fallback: false
  }
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
    <>
    <ReactMarkdown
      remarkPlugins={[emoji, github]}
    >
      {data.content}
    </ReactMarkdown>
    </>
  )
}
