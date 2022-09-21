import SyntaxHighlighter from 'react-syntax-highlighter'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

type Props = {
  language: string
  children: string
}

function Code({ language, children }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      showLineNumbers
      customStyle={{ borderRadius: '4px', marginBottom: '1em' }}
      style={dracula}
    >
      {children}
    </SyntaxHighlighter>
  )
}

const CodeBlock: CodeComponent = ({ children, inline, className }) => {
  const language = !className ? 'bash' : className.split('-')[1]
  if (inline)
    return (
      <code
        style={{
          padding: '2px 6px 2px 6px',
          backgroundColor: '#FFFFFF33',
          borderRadius: '4px',
        }}
      >
        {children}
      </code>
    )

  return <Code language={language}>{String(children)}</Code>
}

export default CodeBlock
