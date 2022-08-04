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
    <Box>
      {
        props.children[clicked]
      }
      <Flex
        position={'relative'}
        gap={['1em', '3em']}
        w='fit-content'
        ml={'5em'}
      >
        {
          props.children.map((_, index) => {
            return (
              <TimelineIndicator
                key={index}
                focused={index === clicked}
                zIndex={'2'}
                boxSize={['1.25em', '1.5em']}
                onClick={() => handleClick(index)}
              />
            )
          })
        }
        <Box
          bgColor={'#FFEEEE'}
          position='absolute'
          alignSelf='center'
          right={'5%'}
          w={'500%'}
          h={['2px', '4px']}
          zIndex={'1'}
        />
      </Flex>
    </Box>
  )
}