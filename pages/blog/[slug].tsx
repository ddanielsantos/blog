import Head from 'next/head'
import { getPost } from '../../src/lib/getPost'
import { Header, TagGroup, Footer } from '../../src/components/'
import { getPostsFilenames } from '../../src/lib/getPostsFileNames'
import { getSlugFromFilename } from '../../src/lib/getSlugFromFilename'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Flex, Text, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

type PostData = Awaited<ReturnType<typeof getPost>>['data']

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

export const getStaticProps: GetStaticProps<{
	data: { content: string; meta: PostData }
}> = async context => {
	if (!context.params?.slug) {
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

export default function BlogPost({
	data
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const Markdown = dynamic(
		() => import('../../src/components/Markdown/Markdown')
	)

	return (
		<div>
			<Head>
				<title>{data.meta.title}</title>
			</Head>
			<Flex w={'100%'} flexDir='column' alignItems='center' minH={'100vh'}>
				<Header />
				<Flex
					direction={'column'}
					w={['100%', '100%', '40em']}
					h={'100%'}
					my='3rem'
					gap='5'
					textAlign='justify'
					p={'6'}
				>
					<Heading
						as={'h1'}
						textAlign='left'
						lineHeight={1}
						fontWeight={'black'}
						fontSize='3xl'
					>
						{data.meta.title}
					</Heading>
					<Text textAlign={'right'}>{data.meta.date}</Text>
					<TagGroup tags={data.meta.tags} />
					<Markdown content={data.content} />
				</Flex>
				<Footer />
			</Flex>
		</div>
	)
}
