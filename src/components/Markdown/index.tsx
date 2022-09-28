import Image from 'next/image'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'markdown-to-jsx'
import { UnorderedList } from '@chakra-ui/react'

const CodeBlock = dynamic(
	() => import('../../../src/components/CodeBlock/index'),
	{ ssr: false }
)
const MarkdownText = dynamic(
	() => import('../../../src/components/MarkdownText/index')
)

type Props = {
	content: string
}

export default function Markdown(props: Props) {
	return (
		<ReactMarkdown
			options={{
				overrides: {
					h1: {
						component: MarkdownText,
						props: {
							variant: 'h1'
						}
					},
					h2: {
						component: MarkdownText,
						props: {
							variant: 'h2'
						}
					},
					p: {
						component: MarkdownText,
						props: {
							variant: 'p'
						}
					},
					a: {
						props: {
							rel: 'noreferrer',
							target: '_blank',
							style: {
								textDecoration: 'underline'
							}
						}
					},
					img: {
						component: Image
					},
					ul: {
						component: UnorderedList,
						props: {
							mb: '1em'
						}
					},
					code: CodeBlock
				}
			}}
		>
			{props.content}
		</ReactMarkdown>
	)
}
