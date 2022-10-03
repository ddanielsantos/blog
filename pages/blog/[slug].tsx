import Head from 'next/head'
import NextLink from 'next/link'
import { getPost } from '../../src/lib/getPost'
import { Header } from '../../src/components/Header/Header'
import { getPostsFilenames } from '../../src/lib/getPostsFileNames'
import { getSlugFromFilename } from '../../src/lib/getSlugFromFilename'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Box, Flex, Text, Heading, Link } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Footer } from '../../src/components/Footer/Footer'
import { ChevronLeftIcon } from '@chakra-ui/icons'

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
				<Box
					w={['100%', '100%', '100%', '60em']}
					h={'100%'}
					textAlign='justify'
					p={'1.5rem'}
				>
					<div style={{ marginBottom: '24px' }}>
						<NextLink href='/blog' passHref>
							<Link
								position={'relative'}
								padding={'2'}
								borderRadius={'7px'}
								fontSize='sm'
								transition={'background-color 0.3s'}
								border={`2px solid black`}
								_hover={{
									color: 'white',
									bg: 'black'
								}}
							>
								<ChevronLeftIcon />
								go back
							</Link>
						</NextLink>
					</div>

					<Flex
						w='100%'
						flexDir={['column', 'column', 'row']}
						justifyContent={'space-between'}
						alignItems={['start', 'start', 'center']}
						mb={'3rem'}
					>
						<Heading as={'h1'} lineHeight={1} fontWeight={'extrabold'}>
							{data.meta.title}
						</Heading>
						<Text textAlign={'right'}>{data.meta.date}</Text>
					</Flex>

					<Markdown content={data.content} />
				</Box>
				<Footer />
			</Flex>
		</div>
	)
}
