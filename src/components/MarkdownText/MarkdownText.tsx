import { Text } from '@chakra-ui/react'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

type Props = Omit<HeadingProps, 'level'> & {
	variant: 'h1' | 'h2' | 'p'
}

const MarkdownText = (props: Props) => {
	const styles = {
		h1: {
			fontFamily: 'Montserrat',
			mb: '1em',
			tabIndex: 0,
			fontWeight: 'extrabold',
			fontSize: '3xl',
			as: 'h1'
		},
		h2: {
			fontFamily: `'Montserrat Black', sans-serif`,
			tabIndex: 0,
			mb: '1em',
			fontSize: 'xl',
			fontWeight: 900
		},
		p: {
			mb: '1em',
			as: 'p',
			fontWeight: 400,
			fontSize: 'md',
			fontFamily: `'Noto Sans', sans-serif`
		}
	}
	return (
		<Text {...styles[props.variant]} as={props.variant}>
			{props.children}
		</Text>
	)
}

export default MarkdownText
