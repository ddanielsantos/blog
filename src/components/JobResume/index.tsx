import { Box, Flex, Text } from '@chakra-ui/react'

type Props = {
  title: string
  role?: string
  resume: string
  tags?: string[]
  color?: string
}

export const JobResume = (props: Props) => {
  return (
    <Box
      py={['1rem']}
    >
      <Text
        fontSize={['xl', 'xl', '2xl', '2xl', '3xl', '4xl']}
        fontWeight='bold'
        color={props.color}
      >
        {props.title}
      </Text>
      <Text
        fontSize={['md', 'md', 'lg', 'lg', 'xl', '2xl']}
        textAlign='justify'
        wordBreak={'break-all'}
        color={props.color}
      >
        {props.resume}
      </Text>
      <Flex
        mt='1.25rem'
        gap='1rem'
        flexWrap={'wrap'}
      >
        {props.tags?.map((tag, index) => {
          return (
            <Text
              cursor={'default'}
              px={'2'}
              py={'1'}
              transitionDuration='0.5s'
              borderRadius={'5'}
              key={index}
              _hover={{
                bg: 'whiteAlpha.200',
                textDecor: 'underline'
              }}
              color={props.color}
              fontSize={['sm', 'sm', 'md', 'md', 'lg', 'xl']}
              fontWeight='bold'
            >
              #{tag}
            </Text>
          )
        })}
      </Flex>
    </Box>
  )
}