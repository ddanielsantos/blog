import { IconProps, keyframes } from '@chakra-ui/react'
import { FocusedIndicator } from '../../icons/FocusedIndicator'
import { UnfocusedIndicator } from '../../icons/UnfocusedIndicator'

const circleKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const animation = `${circleKeyframes} 8s linear infinite`

type Props = IconProps & {
  focused: boolean
}

export const TimelineIndicator = ({ focused, ...props }: Props) => {
  if (focused) return <FocusedIndicator animation={animation} {...props} />

  return <UnfocusedIndicator {...props} />
}
