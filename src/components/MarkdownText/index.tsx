import { Text } from '@chakra-ui/react'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

type Props = Omit<HeadingProps, 'level'> & {
	variant: 'h1' | 'h2' | 'p'
}

const MarkdownText = (props: Props) => {
	const styles = {
		h1: {
			fontFamily: 'Teko',
			mb: '1em',
			tabIndex: 0,
			fontWeight: 'extrabold',
			fontSize: '3xl',
			as: 'h1'
		},
		h2: {
			fontFamily: 'Teko',
			tabIndex: 0,
			mb: '1em',
			fontSize: '2xl',
			fontWeight: 'bold'
		},
		p: {
			mb: '1em',
			as: 'p',
			fontWeight: 'light',
			fontSize: 'lg',
			fontFamily: 'Titillium Web'
		}
	}
	return (
		<Text {...styles[props.variant]} as={props.variant}>
			{props.children}
		</Text>
	)
}

export default MarkdownText
