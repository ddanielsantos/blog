import { COLORS } from '../../theme'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostCard } from '../../src/components/PostCard'
import { getPostsFilenames } from '../../src/lib/getPostsFileNames'
import { getPostData } from '../../src/lib/getPostData'

type Data = Awaited<ReturnType<typeof getPostData>>

export const getStaticProps: GetStaticProps<{ data: Data[] }> = async () => {
  const filenames = getPostsFilenames()
  const promises = filenames.map(filename => getPostData(filename))
  const data = await Promise.all(promises)

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { data }
  } 
}

export default function Blog({ data }: InferGetStaticPropsType<typeof getStaticProps>){
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
        p={['1rem', '1rem', '2rem']}
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
      <Heading
        color={COLORS.paneIndicator.main.blue}
        lineHeight={1}
        fontWeight={'extrabold'}
       >
        BLOG
      </Heading>
        <Text
          color={COLORS.paneIndicator.main.blue}
          fontWeight='medium'
          fontSize={'xl'}
        >
          Welcome to my blog, here I wrote about tech, career or some other cool topics
        </Text>
        <Flex
          flexDir={'column'}
          gap={'2'}
        >
          {
            data.map((post, index) => {
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
            })
          }
        </Flex>
      </Box>
    </Flex>
  )
}
