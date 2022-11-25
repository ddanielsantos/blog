import Head from 'next/head'
import { Box, Flex, Heading, Text, useColorMode } from '@chakra-ui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Divider, Header, Footer, PostCard } from '../../src/components'
import { getPostsFilenames } from '../../src/lib/getPostsFileNames'
import { getPost } from '../../src/lib/getPost'

type Data = Awaited<ReturnType<typeof getPost>>['data']

export const getStaticProps: GetStaticProps<{ data: Data[] }> = async () => {
	const filenames = getPostsFilenames()
	const promises = filenames.map(filename => getPost(filename))
	const result = await Promise.all(promises)
	const data = result.map(v => v.data)

	if (!data) {
		return {
			notFound: true
		}
	}

	return {
		props: { data }
	}
}

export default function Blog({
	data
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { colorMode } = useColorMode()
	return (
		<Flex
			minH={'100vh'}
			flexDir='column'
			alignItems='center'
			bg={colorMode === 'light' ? 'whiteAlpha.800' : 'blackAlpha.50'}
		>
			<Head>
				<title>blog</title>
			</Head>
			<Header />
			<Box
				overflowY={'scroll'}
				overflowX={'hidden'}
				w={['100%', '100%', '100%', '60em']}
				p={'1.5rem'}
				pb={0}
			>
				<Heading as={'h1'} lineHeight={1} fontWeight={'extrabold'} mb={'1rem'}>
					Blog
				</Heading>
				<Text fontSize={'lg'} mb={'1rem'}>
					welcome to my blog, here I wrote about tech, career or some other cool
					topics
				</Text>

				<Divider colorMode={colorMode} />

				<Flex flexDir={'column'}>
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
			<Footer />
		</Flex>
	)
}
