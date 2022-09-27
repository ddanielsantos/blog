import dynamic from 'next/dynamic'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'

const CodeBlock: CodeComponent = ({ children, inline, className }) => {
	const language = !className ? 'bash' : className.split('-')[1]
	if (inline)
		return (
			<code
				style={{
					padding: '2px 6px 2px 6px',
					backgroundColor: '#FFFFFF33',
					borderRadius: '4px'
				}}
			>
				{children}
			</code>
		)
	const Code = dynamic(() => import('./Code/index'))

	return <Code language={language}>{String(children)}</Code>
}

export default CodeBlock
