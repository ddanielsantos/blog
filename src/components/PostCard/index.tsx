import NextLink from 'next/link'
import { Box, Flex, Link, Text, Heading } from '@chakra-ui/react'
import { Tag } from '../Tag'

type Props = {
	slug: string
	title: string
	date: string
	tags: string[]
	description: string
}

export const PostCard = (props: Props): JSX.Element => {
	return (
		<NextLink href={`blog/${props.slug}`} passHref>
			<Link
				outline={'3px solid #CBD5E0'}
				mb={'0.75rem'}
				boxSizing={'border-box'}
				textDecor={'none'}
				transition={'border ease 0.4s'}
				_focus={{
					outline: '3px solid #63B3ED'
				}}
				_hover={{
					outline: '3px solid black'
				}}
				w={'100%'}
				borderRadius='4px'
				p={'3'}
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

				<Flex mt={'2'}>
					{props.tags.map((tag, index) => (
						<Tag key={index} tag={tag} _hover={{ bg: 'none' }} />
					))}
				</Flex>
			</Link>
		</NextLink>
	)
}
