import { Text, TextProps } from '@chakra-ui/react'

type Props = {
	tag: string
} & TextProps

export const Tag = (props: Props) => {
	return (
		<Text
			cursor={'default'}
			px={'2'}
			py={'1'}
			transitionDuration='0.5s'
			borderRadius={'5'}
			_hover={{
				bg: 'whiteAlpha.200',
				textDecor: 'underline'
			}}
			color={props.color}
			fontSize={['sm', 'sm', 'md', 'md', 'lg', 'xl']}
			fontWeight={'normal'}
			{...props}
		>
			#{props.tag}
		</Text>
	)
}
