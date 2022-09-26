import { Heading as CHeading } from '@chakra-ui/react'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

type Props = Omit<HeadingProps, 'level'> & {
	variant: 'h1' | 'h2' | 'p'
}

const MarkdownText = (props: Props) => {
	const styles = {
		h1: { mb: '1em', fontWeight: 'extrabold', fontSize: '3xl', as: 'h1' },
		h2: { mb: '1em', fontWeight: 'extrabold', fontSize: 'lg' },
		p: { mb: '1em', as: 'p', fontWeight: 'light', fontSize: 'lg' }
	}
	return (
		<CHeading
			lineHeight={1.4}
			fontSize={['md']}
			{...styles[props.variant]}
			as={props.variant}
		>
			{props.children}
		</CHeading>
	)
}

export default MarkdownText
