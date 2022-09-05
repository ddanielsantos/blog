import NextLink from 'next/link'
import { Box, Link, Text } from "@chakra-ui/react"

type Props = {
  slug: string
  title: string
  date: string
  description: string
}

export const PostCard = (props: Props): JSX.Element => {
  return (
    <NextLink href={`blog/${props.slug}`} passHref>
      <Link
        bg={'whiteAlpha.300'}
        color={'white'}
        transition={'ease 0.5s'}
        _hover={{
          bg: 'whiteAlpha.500'
        }}
        w={'100%'}
        borderRadius='md'
        p={'3'}
      >
        <Box
          display={'flex'}
          justifyContent='space-between'
          mb={'0.5em'}
        >
          <Text
            fontWeight={'bold'}
          >
            {props.title}
          </Text>
          <Text>
            {props.date}
          </Text>
        </Box>

        <Text>
          {props.description}
        </Text>
      </Link>
    </NextLink>
  )
}
