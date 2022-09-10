import SyntaxHighlighter from 'react-syntax-highlighter'

type Props = {
  language: string
  children: string
}

export default function Code({ language, children }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      children={children}
    />
  )
}
