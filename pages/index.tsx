import NextLink from 'next/link'
import Head from 'next/head'
import { Text, Flex, Image, Link, Heading } from '@chakra-ui/react'
import { Footer } from '../src/components/Footer/Footer'
import dynamic from 'next/dynamic'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Home() {
	const PreviousWorksCarousel = dynamic(() =>
		import(
			'../src/components/PreviousWorksCarousel/PreviousWorksCarousel'
		).then(v => v.PreviousWorksCarousel)
	)

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
			<Flex
				id='main'
				as='main'
				transition={'ease-out'}
				transitionDuration={'0.3s'}
				w='100%'
				flexDir={'column'}
				alignItems='center'
				overflowY='scroll'
			>
				<Flex
					as={'section'}
					tabIndex={0}
					w={['100%', '100%', '100%', '60em']}
					flexDir='column'
					alignItems='flex-end'
					justifyContent={'flex-end'}
					padding={'1em'}
					flexShrink={0}
					scrollSnapAlign='start'
					h={'100vh'}
				>
					<Heading
						lineHeight={0.9}
						textTransform={'uppercase'}
						fontWeight='extrabold'
						fontSize={['3.5em', '4em']}
						textAlign='right'
					>
						Daniel
					</Heading>
					<Heading
						lineHeight={0.9}
						textTransform={'uppercase'}
						fontWeight='extrabold'
						fontSize={['3.5em', '4em']}
						textAlign='right'
					>
						Santos
					</Heading>
					<Text
						textTransform={'uppercase'}
						fontSize={['1.25em', '1.25em']}
						textAlign='right'
					>
						PASSIONATE DEVELOPER
					</Text>
				</Flex>

				<Flex
					as='section'
					w={['100%', '100%', '100%', '60em']}
					tabIndex={0}
					justifyContent={'flex-start'}
					p={['1rem', '1rem', '2rem']}
					flexShrink={0}
					scrollSnapAlign='start'
					minH={'100vh'}
					flexDir={['column', 'row']}
					mt={'1'}
					gap={'3'}
					margin='auto'
					alignItems={'center'}
				>
					<Image
						src={'/Happy-Person-Free-Download-PNG.png'}
						alt='me'
						boxSize={'250px'}
					/>
					<Flex wrap={'wrap'} flexDir={'column'}>
						<Text fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}>
							Hi, I&apos;m Daniel Santos. I like to code and drink coffee.
							Sometimes I blog about random stuff.
						</Text>
						<NextLink href='/blog' passHref>
							<Link
								position={'relative'}
								padding={'2'}
								alignSelf={'flex-end'}
								borderRadius={'7px'}
								paddingInline={'4'}
								textAlign={'right'}
								fontSize='sm'
								fontWeight='bold'
								transition={'background-color 0.3s'}
								border={`2px solid black`}
								_hover={{
									color: 'white',
									bg: 'black'
								}}
							>
								read the blog <ChevronRightIcon />
							</Link>
						</NextLink>
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
					<Heading
						lineHeight={1}
						flexShrink={0}
						fontWeight='semibold'
						fontSize={['2.5em', '3em', '3.5em']}
					>
						my latest works
					</Heading>
					<PreviousWorksCarousel />
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
					<Heading
						lineHeight={1}
						flexShrink={0}
						fontWeight='semibold'
						fontSize={['2.5em', '3em', '3.5em']}
					>
						contact me
					</Heading>
					<ContactsSection />
				</Flex>
			</Flex>
			<Footer />
		</div>
	)
}
