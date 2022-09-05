import { COLORS } from '../../theme'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostCard } from '../../src/components/PostCard'

type Data = {
  title: string
  description: string
  date: string
  slug: string
}

export const getStaticProps: GetStaticProps<{ data: Data[] }> = async () => {
  const data = [
    {
      title: 'Porque eu acho que Jair Messias Bolsonaro está preparado para governar 200 milhoes de brasileiros e algumas outras coisas',
      description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
      date: '04 Sep, 2022',
      slug: 'primeiro-post'
    },
    {
      title: 'Porque eu acho que Jair Messias Bolsonaro está preparado para governar 200 milhoes de brasileiros e algumas outras coisas',
      description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
      date: '04 Sep, 2022',
      slug: 'primeiro-post'
    },
    {
      title: 'primeiro',
      description: 'primeiro post aqui eeee',
      date: '04 Sep, 2022',
      slug: 'primeiro-post'
    },
    {
      title: 'primeiro',
      description: 'primeiro post aqui eeee',
      date: '04 Sep, 2022',
      slug: 'primeiro-post'
    },
    {
      title: 'primeiro',
      description: 'primeiro post aqui eeee',
      date: '04 Sep, 2022',
      slug: 'primeiro-post'
    },
    {
      title: 'primeiro',
      description: 'primeiro post aqui eeee',
      date: '04 Sep, 2022',
      slug: 'primeiro-post'
    }
  ]

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
