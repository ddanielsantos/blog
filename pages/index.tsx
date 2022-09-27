import NextLink from 'next/link'
import Head from 'next/head'
import { Timeline } from '../src/components/Timeline'
import { JobResume } from '../src/components/JobResume'
import { Text, Flex, Image, Link, Heading } from '@chakra-ui/react'

export default function Home() {
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
				h='100vh'
				css={{
					'&::-webkit-scrollbar': {
						width: '6px'
					},
					'&::-webkit-scrollbar-track': {
						width: '6px'
					},
					'&::-webkit-scrollbar-thumb': {
						background: 'black'
					}
				}}
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
					<Text
						lineHeight={0.9}
						textTransform={'uppercase'}
						fontWeight='extrabold'
						fontSize={['3.5em', '4em']}
						textAlign='right'
					>
						Daniel
					</Text>
					<Text
						lineHeight={0.9}
						textTransform={'uppercase'}
						fontWeight='extrabold'
						fontSize={['3.5em', '4em']}
						textAlign='right'
					>
						Santos
					</Text>
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
					flexDir='column'
					tabIndex={0}
					alignItems='flex-start'
					justifyContent={'flex-start'}
					p={['1rem', '1rem', '2rem']}
					flexShrink={0}
					scrollSnapAlign='start'
					minH={'100vh'}
				>
					<Heading
						lineHeight={1}
						textTransform={'uppercase'}
						fontWeight='extrabold'
						fontSize={['2.5em', '3em', '3.5em']}
					>
						me
					</Heading>

					<Flex flexDir={'column'} mt={'1'} gap={'2'}>
						<Text
							// fontWeight='semibold'
							fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}
						>
							Hi, I&apos;m Daniel Santos. I like to code and drink coffee.
							Sometimes I blog about random stuff.
						</Text>
						<Image
							src={'/Happy-Person-Free-Download-PNG.png'}
							alt='me'
							boxSize={'250px'}
						/>
					</Flex>
					<NextLink href='/blog' passHref>
						<Link
							position={'relative'}
							// background={'white'}
							padding={'2'}
							borderRadius={'7px'}
							paddingInline={'4'}
							fontSize='sm'
							fontWeight='bold'
							transition={'background-color 0.3s'}
							border={`2px solid black`}
							_hover={{
								color: 'white',
								bg: 'black'
							}}
						>
							read the blog
						</Link>
					</NextLink>
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
						textTransform={'uppercase'}
						fontWeight='semibold'
						fontSize={['2.5em', '3em', '3.5em']}
					>
						Previous works
					</Heading>
					<Timeline>
						<JobResume
							title={'React Native Developer'}
							resume={`Worked on the planning, the development, and the deploy
              of Dica60+, a mobile web focused on helping elderly people of 
              Belém to find social and health services`}
							tags={['react-native', 'google-play-console', 'expo']}
						/>
						<JobResume
							title={'Software developer - Intern'}
							resume='Built and maintained many SQL queries and Crystal Report
              files inside SAP Business One. I also started the development of
              a Rest API to communicate between Power BI and the ERP, using NodeJS'
							tags={['sql', 'sap', 'nodejs', 'crystal-reports']}
						/>
					</Timeline>
				</Flex>
			</Flex>
		</div>
	)
}
