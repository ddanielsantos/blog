import { GetStaticPaths, GetStaticProps } from "next"
import { getPostsFilenames } from "../../src/lib/getPostsFileNames"
import { getSlugFromFilename } from "../../src/lib/getSlugFromFilename"

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

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const { slug } = params

  return {
    props: {
      data: { slug }
    }
  }
}

export default function BlogPost({ data }) {
  return (
    <h1>
      {data.slug}
    </h1>
  )
}
