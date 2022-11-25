import NextLink from 'next/link'
import { Box, Link, Text, Heading, useColorMode } from '@chakra-ui/react'
import { TagGroup } from '../index'

type Props = {
	slug: string
	title: string
	date: string
	tags: string[]
	description: string
}

export const PostCard = (props: Props): JSX.Element => {
	const { colorMode } = useColorMode()
	const shadowColor = colorMode === 'light' ? '0deg 0% 66%' : '220deg 40% 4%'
	const s = `
  0px 0.3px 0.4px hsl(${shadowColor} / 0.25),
      0px 1.6px 2.1px -0.7px hsl(${shadowColor} / 0.38),
      0.1px 5.3px 6.8px -1.4px hsl(${shadowColor} / 0.5)
  `
	return (
		<NextLink href={`blog/${props.slug}`} passHref>
			<Link
				outline={`1px solid hsl(${shadowColor})`}
				mb={'0.75rem'}
				boxSizing={'border-box'}
				textDecor={'none'}
				transition={'ease 0.3s'}
				_focus={{
					boxShadow: s,
					outline: '3px solid #63B3ED'
				}}
				_hover={{
					boxShadow: s
				}}
				w={'100%'}
				borderRadius='4px'
				p={'3'}
				pb='0'
				sx={{
					'&:hover h2': {
						textDecoration: 'underline'
					}
				}}
			>
				<Box display={'flex'} justifyContent='space-between' mb={'0.5em'}>
					<Heading as={'h2'} fontWeight={'medium'} fontSize={'xl'}>
						{props.title}
					</Heading>
					<Text whiteSpace={'nowrap'}>{props.date}</Text>
				</Box>

				<Text fontSize={'medium'}>{props.description}</Text>

				<TagGroup tags={props.tags} />
			</Link>
		</NextLink>
	)
}
