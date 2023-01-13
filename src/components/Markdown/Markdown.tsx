import Image from 'next/image'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'markdown-to-jsx'
import { UnorderedList } from '@chakra-ui/react'

const CodeBlock = dynamic(() => import('../CodeBlock/CodeBlock'), {
	ssr: false
})
const MarkdownText = dynamic(() => import('../MarkdownText/MarkdownText'))

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
					ul: {
						component: UnorderedList,
						props: {
							mb: '1em',
							display: 'flex',
							flexDirection: 'column',
							gap: '0.25rem'
						}
					},
					img: {
						component: props => (
							<Image
								width={300}
								height={300}
								{...props}
								alt={props.alt || ''}
							/>
						)
					},
					code: {
						component: CodeBlock
					}
				}
			}}
		>
			{props.content}
		</ReactMarkdown>
	)
}
