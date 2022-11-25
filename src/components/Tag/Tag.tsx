import { Text, TextProps } from '@chakra-ui/react'

type Props = {
	content: string
} & TextProps

export const Tag = (props: Props) => {
	return (
		<Text
			cursor={'default'}
			px={'2'}
			py={'1'}
			w={'fit-content'}
			transitionDuration='0.5s'
			borderRadius={'5'}
			_hover={{
				bg: 'blackAlpha.300',
				textDecor: 'underline'
			}}
			color={props.color}
			fontSize={'sm'}
			fontWeight={'normal'}
			{...props}
		>
			#{props.content}
		</Text>
	)
}
