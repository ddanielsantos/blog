import { Heading as CHeading, HeadingProps as CHeadingProps } from '@chakra-ui/react'
import { COLORS } from '../../../theme'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

type Props = HeadingProps & {
  chakra?: CHeadingProps
}

const MarkdownText = ({ chakra, ...props }: Props) => {
  return (
    <CHeading
      color={COLORS.paneIndicator.main.blue}
      fontWeight={'extrabold'}
      fontSize={['md']}
      {...chakra}
    >
      {props.children}
    </CHeading>
  )
}

export default MarkdownText
