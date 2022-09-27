import Image from 'next/image'
import github from 'remark-gfm'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
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
			remarkPlugins={[github]}
			components={{
				code: CodeBlock,
				img: props => {
					return <Image src={props.src} alt={props.alt} />
				},
				ul: props => (
					<UnorderedList mb={'1em'} fontFamily={'Titillium Web'}>
						{props.children}
					</UnorderedList>
				),
				h1: props => <MarkdownText {...props} variant={'h1'} />,
				h2: props => <MarkdownText {...props} variant={'h2'} />,
				p: props => <MarkdownText {...props} variant={'p'} />,
				a: props => {
					return (
						<a
							href={props.href}
							target={'_blank'}
							rel={'noreferrer'}
							style={{
								textDecoration: 'underline',
								textDecorationThickness: '2px'
							}}
						>
							{props.children}
						</a>
					)
				}
			}}
		>
			{props.content}
		</ReactMarkdown>
	)
}
