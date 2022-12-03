import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
	duotoneSpace as darkTheme,
	prism as ligthTheme
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import rs from 'react-syntax-highlighter/dist/esm/languages/prism/rust'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import { Box, Button, useColorMode } from '@chakra-ui/react'

type Props = {
	language: string
	children: string
}

SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('rs', rs)
SyntaxHighlighter.registerLanguage('sql', sql)

export default function Code({ language, children }: Props) {
	const { colorMode } = useColorMode()
	return (
		<Box
			marginBottom='1em'
			position={'relative'}
			borderRadius='10px'
			sx={{
				'&:hover > button': {
					display: 'block'
				}
			}}
		>
			<Button
				position={'absolute'}
				bg='transparent'
				_hover={{
					background: 'transparent'
				}}
				right={0}
				color='gray.500'
				display={'none'}
				onClick={() => console.log('copy to clipboard')}
			>
				copy
			</Button>
			<SyntaxHighlighter
				language={language}
				customStyle={{ borderRadius: '10px', marginTop: 0 }}
				style={colorMode === 'dark' ? darkTheme : ligthTheme}
			>
				{children}
			</SyntaxHighlighter>
		</Box>
	)
}
