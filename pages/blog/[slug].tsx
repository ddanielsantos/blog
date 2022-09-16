import github from 'remark-gfm'
import emoji from 'remark-emoji'
import dynamic from 'next/dynamic'
import { COLORS } from '../../theme'
import ReactMarkdown from 'react-markdown'
import { getPost } from "../../src/lib/getPost"
import { Box, Flex, UnorderedList, Text, Heading } from '@chakra-ui/react'
import { getPostsFilenames } from "../../src/lib/getPostsFileNames"
import { getSlugFromFilename } from "../../src/lib/getSlugFromFilename"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"

const CodeBlock = dynamic(() => import('../../src/components/CodeBlock/index'), { ssr: false })
const MarkdownText = dynamic(() => import('../../src/components/MarkdownText/index'))

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
    <Flex
      w={'100%'}
      flexDir='column'
      alignItems='center'
      bg={'gray.50'}
      h={'100vh'}
    >
      <Box
        overflowY={'scroll'}
        w={['100%', '100%', '100%', '60em']}
        minH={'100vh'}
        h={'100%'}
        color={'gray.700'}
        textAlign="justify"
        p={'1.5rem'}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'black',
            borderRadius: '0px',
          },
        }}

      >
        <Flex
          w='100%'
          flexDir={['column', 'column', 'row']}
          justifyContent={'space-between'}
          alignItems={['start', 'start','center']}
          mb={'3rem'}
        >
          <Heading
            as={'h1'}
            color={'gray.700'}
            lineHeight={1}
            fontWeight={'extrabold'}
            mb={'1rem'}
           >
            {data.meta.title}
          </Heading>
          <Text
            textAlign={'right'}
            color={'gray.700'}
          >
            {data.meta.date}
          </Text>
        </Flex>

        <ReactMarkdown
          remarkPlugins={[emoji, github]}
          components={{ 
            code: CodeBlock,
            ul: props => <UnorderedList {...props} mb={'1em'}/>,
            h1: props => <MarkdownText {...props} variant={'h1'}/>,
            h2: props => <MarkdownText {...props} variant={'h2'}/>,
            p: props => <MarkdownText {...props} variant={'p'}/>,
            a: props => {
              return (
                <a 
                  href={props.href} 
                  target={'_blank'} 
                  rel={'noreferrer'} 
                  style={{ 
                    textDecoration: 'underline', 
                    textDecorationThickness: '2px'
                  }}
                >
                  {props.children}
                </a>
              )
            }
          }}
        >
          {data.content}
        </ReactMarkdown>
      </Box>
    </Flex>
  )
}
