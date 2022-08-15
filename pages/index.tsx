import { useState, useEffect } from 'react'
import { COLORS } from '../theme'
import { Text, Flex } from '@chakra-ui/react'
import { Timeline } from '../components/Timeline'
import { JobResume } from '../components/JobResume'

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
        w='100%'
        flexDir={'column'}
        alignItems='center'

        scrollSnapType={['none', 'none', 'y proximity']}
        overflowY='scroll'
        h='100vh'

        css={{
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ffffffcc',
            borderRadius: '6px',
          },
        }}
      >
        <Flex
          as={'section'}
          bg={COLORS.backgrounds.yellow}
          shadow={'2xl'}
          w={['100%', '100%', '100%', '60em']}
          flexDir='column'
          alignItems='flex-end'
          justifyContent={'flex-end'}
          padding={'1em'}

          flexShrink={0}
          scrollSnapAlign='start'
          h={'100vh'}
        >
          <Text
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
            PASSIONATE DEVELOPER
          </Text>
        </Flex>

        <Flex
          as='section'
          bg={COLORS.backgrounds.blue}
          shadow={'2xl'}
          w={['100%', '100%', '100%', '60em']}
          flexDir='column'
          alignItems='flex-start'
          justifyContent={'flex-start'}

          p={['1rem', '1rem', '2rem']}
          flexShrink={0}
          scrollSnapAlign='start'
          minH={'100vh'}
        >
          <Text
          lineHeight={1}
            color={COLORS.paneIndicator.main.blue}
            textTransform={'uppercase'}
            fontWeight='extrabold'
            fontSize={['2.5em', '3em', '3.5em']}
          >
            me
          </Text>
        </Flex>

        <Flex
          as='section'
          bg={COLORS.backgrounds.red}
          shadow={'2xl'}
          w={['100%', '100%', '100%', '60em']}
          flexDir='column'
          alignItems='flex-start'
          justifyContent={'flex-start'}

          p={['1rem', '1rem', '2rem']}

          flexShrink={0}
          overflow='hidden'
          scrollSnapAlign='start'
          minH={'100vh'}
        >
          <Text
            lineHeight={1}
            flexShrink={0}
            color={COLORS.paneIndicator.main.red}
            textTransform={'uppercase'}
            fontWeight='extrabold'
            fontSize={['2.5em', '3em', '3.5em']}
          >
            Previous works
          </Text>
          <Timeline>
            <JobResume
              title='Lorem ipsum'
              role='intern'
              resume='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.'
              tags={['sql', 'nodejs']}
              color={COLORS.paneIndicator.main.red}
            />
            <JobResume
              title={'Noah\'s ark'}
              role='intern'
              resume={'Friday night tryna make it into the city Breakneck speeds, passenger seat something pretty Thinking back to how I got here in the first place Second class bitches wouldn\'t let me on first base A backpack  with luxury taste buds'}
              tags={['sql', 'nodejs', 'sap', 'mongodb', 'graphql', 'irineu', 'weebs']}
              color={COLORS.paneIndicator.main.red}
            />
          </Timeline>
        </Flex>
      </Flex>
    </>
  )
}
