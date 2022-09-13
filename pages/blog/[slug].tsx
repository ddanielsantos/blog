import github from 'remark-gfm'
import emoji from 'remark-emoji'
import dynamic from 'next/dynamic'
import { COLORS } from '../../theme'
import ReactMarkdown from 'react-markdown'
import { getPost } from "../../src/lib/getPost"
import { Box, Flex, UnorderedList, Text } from '@chakra-ui/react'
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
      bg={COLORS.backgrounds.blue}

      h={'100vh'}
    >
      <Box
        overflowY={'scroll'}
        shadow={'2xl'}
        w={['100%', '100%', '100%', '60em']}
        minH={'100vh'}
        h={'100%'}
        textAlign="justify"
        py={'1.5rem'}
        px={['1rem', '5rem', '8rem']}
        bg={COLORS.backgrounds.blue}
        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ffffffcc',
            borderRadius: '6px',
          },
        }}
      >
        <Flex
          w='100%'
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={'3rem'}
        >
          <Text
            as='h1'
            fontWeight='extrabold'
            color={COLORS.paneIndicator.main.blue}
            fontSize='3xl'
          >
            {data.meta.title}
          </Text>
          <Text
            color={COLORS.paneIndicator.main.blue}
          >
            {data.meta.date}
          </Text>
        </Flex>

        <ReactMarkdown
          remarkPlugins={[emoji, github]}
          components={{ 
            code: CodeBlock,
            ul: props => <UnorderedList color={COLORS.paneIndicator.main.blue} mb={'1em'}>{props.children}</UnorderedList>,
            h1: props => <MarkdownText {...props} chakra={{ mb: '1em', fontWeight: 'extrabold', fontSize: '3xl', as: 'h1' }}/>,
            h2: props => <MarkdownText {...props} chakra={{ mb: '1em', fontWeight: 'extrabold', fontSize: 'lg' }}>{props.children}</MarkdownText>,
            p: props => <MarkdownText {...props} level={1} chakra={{ mb: '1em', as: 'p', fontWeight: 'normal' }} />,
            a: props => <a href={props.href} target={'_blank'} rel={'noreferrer'} style={{ textDecoration: 'underline' }} >{props.children}</a>
          }}
        >
          {data.content}
        </ReactMarkdown>
      </Box>
    </Flex>
  )
}
