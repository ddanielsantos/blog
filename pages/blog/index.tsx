import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostCard } from '../../src/components/PostCard'
import { getPostsFilenames } from '../../src/lib/getPostsFileNames'
import { getPost } from '../../src/lib/getPost'

type Data = Awaited<ReturnType<typeof getPost>>['data']

export const getStaticProps: GetStaticProps<{ data: Data[] }> = async () => {
  const filenames = getPostsFilenames()
  const promises = filenames.map((filename) => getPost(filename))
  const result = await Promise.all(promises)
  const data = result.map((v) => v.data)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
  }
}

export default function Blog({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Flex
      w={'100%'}
      flexDir="column"
      alignItems="center"
      bg={'gray.50'}
      h={'100vh'}
    >
      <Box
        overflowY={'scroll'}
        overflowX={'hidden'}
        w={['100%', '100%', '100%', '60em']}
        h={'100%'}
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
        <Heading
          as={'h1'}
          color={'gray.700'}
          lineHeight={1}
          fontWeight={'extrabold'}
          mb={'1rem'}
        >
          Blog
        </Heading>
        <Text color={'gray.700'} fontSize={'md'} mb={'1rem'}>
          welcome to my blog, here I wrote about tech, career or some other cool
          topics
        </Text>

        <hr
          style={{
            backgroundColor: '#2D3748',
            borderColor: '#2D3748',
            borderRadius: 2,
            borderWidth: '2px',
            marginBottom: '1em',
          }}
        />

        <Flex flexDir={'column'} gap={'2'}>
          {data.map((post, index) => {
            return (
              <PostCard
                key={index}
                tags={post.tags}
                date={post.date}
                slug={post.slug}
                title={post.title}
                description={post.description}
              />
            )
          })}
        </Flex>
      </Box>
    </Flex>
  )
}
