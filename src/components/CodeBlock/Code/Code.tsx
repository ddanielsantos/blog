import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import md from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import rs from 'react-syntax-highlighter/dist/esm/languages/prism/rust'
import { useColorMode } from '@chakra-ui/color-mode'

type Props = {
	language: string
	children: string
}

SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('md', md)
SyntaxHighlighter.registerLanguage('rs', rs)

export default function Code({ language, children }: Props) {
	const { colorMode } = useColorMode()
	return (
		<SyntaxHighlighter
			language={language}
			showLineNumbers
			customStyle={{ borderRadius: '4px', marginBottom: '1em' }}
			style={colorMode === 'dark' ? tomorrow : prism}
		>
			{children}
		</SyntaxHighlighter>
	)
}
