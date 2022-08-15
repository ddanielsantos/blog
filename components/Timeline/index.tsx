import { ReactElement, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { TimelineIndicator } from '../TimelineIndicator'

type Props = {
  children: ReactElement[]
}

export const Timeline = (props: Props) => {
  const [clicked, setClicked] = useState(0)

  const handleClick = (clicked: number) => {
    setClicked(clicked)
  }

  return (
    <Flex
      position={'relative'}
      flex={1}
      gap='1em'
      w='100%'
      flexDir={'column'}
      overflow={'hidden'}
    >
      <Box
        marginY={'auto'}
      >
        {
          props.children[clicked]
        }
      </Box>

      <Flex
        gap={['0.75em', '1.25em']}
      >
        {
          props.children.map((_, index) => {
            return (
              <TimelineIndicator
                key={index}
                flexShrink={0}
                focused={index === clicked}
                zIndex={'2'}
                boxSize={['1.25em', '1.5em']}
                onClick={() => handleClick(index)}
              />
            )
          })
        }
      </Flex>
    </Flex>
  )
}