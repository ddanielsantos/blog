import Head from 'next/head'
import { Flex, Heading, useColorMode } from '@chakra-ui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Header, Footer, PostCard } from '../../src/components'
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
			<Flex
				overflowY={'scroll'}
				overflowX={'hidden'}
				direction='column'
				w={['100%', '100%', '40em']}
				mt='3rem'
				p={'6'}
				gap='3rem'
			>
				<Heading as={'h1'} lineHeight={1} fontWeight={'black'} fontSize='2xl'>
					Welcome to my blog!
				</Heading>

				<Flex flexDir={'column'} gap='0.75rem'>
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
			</Flex>
			<Footer />
		</Flex>
	)
}
