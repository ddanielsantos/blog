import Head from 'next/head'
import { Text, Flex, Heading, useColorMode } from '@chakra-ui/react'
import { ContactsSection, Header, Link } from '../src/components'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Home() {
	const { colorMode } = useColorMode()

	return (
		<div>
			<Head>
				<title>ddaniel.me</title>
			</Head>
			<Header />
			<Flex
				id='main'
				as='main'
				transition={'ease-out'}
				transitionDuration={'0.3s'}
				w='100%'
				bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
				flexDir={'column'}
				alignItems='center'
				overflowY='scroll'
			>
				<Flex
					as='section'
					w={['100%', '100%', '100%', '60em']}
					p={['1rem', '1rem', '2rem']}
					flexShrink={0}
					gap={'6'}
					flexDir={['column']}
					alignItems={'start'}
				>
					<Heading as='h1' fontWeight='black'>
						Yo!
					</Heading>
					<Flex gap={'6'} flexDir={['column', 'row']}>
						{/* TODO: a good looking photo of me here  */}
						<Flex
							sx={{
								aspectRatio: '16 / 10'
							}}
							height={'180px'}
						/>
						<Flex wrap={'wrap'} flexDir={'column'} gap={'6'}>
							<Text fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}>
								My name is Daniel Santos. I&apos;m a brazilian software
								developer, here I post some articles about technology and
								software development.
							</Text>
							<Link
								href={'/blog'}
								title={'read the blog'}
								rightIcon={<ChevronRightIcon />}
							/>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					w='100%'
					mt={'5'}
					p={['1rem', '1rem', '2rem']}
					justify={['space-around', 'center']}
					gap={'3'}
				>
					<ContactsSection />
				</Flex>
			</Flex>
		</div>
	)
}
