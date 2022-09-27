import NextLink from 'next/link'
import Head from 'next/head'
import { Timeline } from '../src/components/Timeline'
import { JobResume } from '../src/components/JobResume'
import { Text, Flex, Image, Link } from '@chakra-ui/react'

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
						width: '4px'
					},
					'&::-webkit-scrollbar-track': {
						width: '4px'
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
					<Text
						lineHeight={1}
						textTransform={'uppercase'}
						fontWeight='extrabold'
						fontSize={['2.5em', '3em', '3.5em']}
					>
						me
					</Text>

					<Flex flexDir={'column'} mt={'1'} gap={'2'}>
						<Text
							fontWeight='semibold'
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
					<Text
						lineHeight={1}
						flexShrink={0}
						textTransform={'uppercase'}
						fontWeight='extrabold'
						fontSize={['2.5em', '3em', '3.5em']}
					>
						Previous works
					</Text>
					<Timeline>
						<JobResume
							title='Lorem ipsum'
							role='intern'
							resume='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.'
							tags={['sql', 'nodejs']}
						/>
						<JobResume
							title={"Noah's ark"}
							role='intern'
							resume={
								"Friday night tryna make it into the city Breakneck speeds, passenger seat something pretty Thinking back to how I got here in the first place Second class bitches wouldn't let me on first base A backpack  with luxury taste buds"
							}
							tags={[
								'sql',
								'nodejs',
								'sap',
								'mongodb',
								'graphql',
								'irineu',
								'weebs'
							]}
						/>
					</Timeline>
				</Flex>
			</Flex>
		</div>
	)
}
