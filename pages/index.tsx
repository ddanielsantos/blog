import Head from 'next/head'
import { Text, Flex, Heading, useColorMode } from '@chakra-ui/react'
import { Footer, Header, Link } from '../src/components'
import dynamic from 'next/dynamic'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Home() {
	const { colorMode } = useColorMode()
	const ContactsSection = dynamic(() =>
		import('../src/components/ContactsSection/ContactsSection').then(
			v => v.ContactsSection
		)
	)

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
					tabIndex={0}
					p={['1rem', '1rem', '2rem']}
					flexShrink={0}
					scrollSnapAlign='start'
					minH={'100vh'}
					flexDir={['column']}
					mt={'1'}
					// gap={'3'}
					margin='auto'
					justifyContent={'center'}
					alignItems={'start'}
				>
					<Heading as='h1' fontWeight='black'>
						Yo!
					</Heading>
					<Flex alignItems={'center'} gap={'3'}>
						{/* TODO: a good looking photo of me here  */}
						<Flex
							sx={{
								aspectRatio: '16 / 10'
							}}
							height={'200px'}
							border='1px solid red'
						></Flex>
						<Flex wrap={'wrap'} flexDir={'column'}>
							<Text fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}>
								My name is Daniel Santos. I&apos;m a brazilian software
								developer.
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
					as='section'
					w={['100%', '100%', '100%', '60em']}
					flexDir='column'
					tabIndex={0}
					alignItems='flex-start'
					justifyContent={'flex-start'}
					p={['1rem', '1rem', '2rem']}
					flexShrink={0}
					overflow='hidden'
					scrollSnapAlign='start'
					minH={'100vh'}
				>
					<Heading lineHeight={1} flexShrink={0} fontWeight='semibold'>
						contact me
					</Heading>
					<ContactsSection />
				</Flex>
			</Flex>
			<Footer />
		</div>
	)
}
