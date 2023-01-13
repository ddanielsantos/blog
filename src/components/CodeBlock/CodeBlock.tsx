import dynamic from 'next/dynamic'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { useColorMode } from '@chakra-ui/react'

const CodeBlock: CodeComponent = ({ children, className }) => {
	const language = !className ? 'bash' : className.split('-')[1]
	const { colorMode } = useColorMode()

	if (!className) {
		return (
			<code
				style={{
					padding: '2px 6px 2px 6px',
					backgroundColor:
						colorMode === 'light' ? 'rgb(245, 242, 240)' : 'rgb(36, 36, 46)',
					borderRadius: '4px'
				}}
			>
				{children}
			</code>
		)
	}
	const Code = dynamic(() => import('./Code/Code'))

	return <Code language={language}>{String(children)}</Code>
}

export default CodeBlock
