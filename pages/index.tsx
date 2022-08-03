import { useState, useEffect } from 'react'
import { COLORS } from './theme'
import { Text, Flex } from '@chakra-ui/react'

export default function Home() {
  const [bgColor, setBgColor] = useState(COLORS.backgrounds.yellow)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { backgroundColor } = getComputedStyle(entry.target)
          setBgColor(backgroundColor)
        }
      })
    }, { root: null, threshold: 0.6 })

    const boxes = document.querySelectorAll('main > *')

    boxes.forEach((box) => {
      observer.observe(box)
    })

    return () => {
      boxes.forEach((box) => {
        observer.unobserve(box)
      })
    }
  }, [])

  return (
    <>
      <Flex
        id='main'
        as='main'
        bg={bgColor}
        transition={'ease-out'}
        transitionDuration={'0.3s'}
        justifyContent={'center'}
        alignItems='center'
        flexDir={'column'}
        w='100%'
      // border='1px solid red'
      >
        <Flex
          as={'section'}
          bg={COLORS.backgrounds.yellow}
          shadow={'2xl'}
          w={['100%', '48em']}
          minH={'100vh'}
          flexDir='column'
          alignItems='flex-end'
          justifyContent={'flex-end'}
          padding={'1em'}
        >
          <Text
            // marginBlockStart={0}
            lineHeight={0.9}
            textTransform={'uppercase'}
            fontWeight='extrabold'
            fontSize={['3.5em', '4em']}
            textAlign='right'
          >
            Daniel
          </Text>
          <Text
            lineHeight={0.9}
            textTransform={'uppercase'}
            fontWeight='extrabold'
            fontSize={['3.5em', '4em']}
            textAlign='right'
          >
            Santos
          </Text>
          <Text
            textTransform={'uppercase'}
            fontWeight='light'
            fontSize={['1.25em', '1.25em']}
            textAlign='right'
          >
            PASSIONATE FULLSTACK DEVELOPER
          </Text>
        </Flex>

        <Flex
          bg={COLORS.backgrounds.blue}
          shadow={'2xl'}
          w={['100%', '48em']}
          minH={'100vh'}
          flexDir='column'
          alignItems='flex-start'
          justifyContent={'flex-start'}
          padding={'1em'}
        >
          <Text
            lineHeight={1}
            color={COLORS.paneIndicator.main.blue}
            textTransform={'uppercase'}
            fontWeight='extrabold'
            fontSize={['3.5em', '4em']}
          >
            me
          </Text>
        </Flex>

        <Flex
          bg={COLORS.backgrounds.red}
          shadow={'2xl'}
          w={['100%', '48em']}
          minH={'100vh'}
          flexDir='column'
          alignItems='flex-start'
          justifyContent={'flex-start'}
          padding={'1em'}
        >

        </Flex>
      </Flex>
    </>
  )
}
