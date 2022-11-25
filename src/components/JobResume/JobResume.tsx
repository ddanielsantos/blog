import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Tag } from '../Tag/Tag'

type Props = {
	title: string
	resume: string
	tags?: string[]
	color?: string
}

export const JobResume = (props: Props) => {
	return (
		<Box py={['1rem']}>
			<Heading
				fontSize={['xl', 'xl', '2xl', '2xl', '3xl', '4xl']}
				fontWeight='normal'
			>
				{props.title}
			</Heading>
			<Text
				fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}
				textAlign='justify'
			>
				{props.resume}
			</Text>
			<Flex mt='1.25rem' gap='1rem' flexWrap={'wrap'}>
				{props.tags?.map((tag, index) => (
					<Tag key={index} content={tag} color={props.color} />
				))}
			</Flex>
		</Box>
	)
}
