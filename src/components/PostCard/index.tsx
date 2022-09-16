import NextLink from 'next/link'
import { Box, Flex, Link, Text } from "@chakra-ui/react"
import { Tag } from '../Tag'

type Props = {
  slug: string
  title: string
  date: string
  tags: string[]
  description: string
}

export const PostCard = (props: Props): JSX.Element => {
  return (
    <NextLink href={`blog/${props.slug}`} passHref>
      <Link
        bg={'gray.50'}
        color={'gray.900'}
        border={'3px solid #CBD5E0'}
        transition={'border ease 0.4s'}
        _hover={{
          border: '3px solid black',
          translateX: '10'
        }}
        w={'100%'}
        borderRadius='4px'
        p={'3'}
      >
        <Box
          display={'flex'}
          justifyContent='space-between'
          mb={'0.5em'}
        >
          <Text
            as={'h2'}
            fontWeight={'bold'}
            fontSize={'lg'}
          >
            {props.title}
          </Text>
          <Text
            whiteSpace={'nowrap'}
          >
            {props.date}
          </Text>
        </Box>

        <Text>
          {props.description}
        </Text>
        
        <Flex
          mt={'2'}
        >
          {
            props.tags.map((tag, index) => 
            <Tag 
              key={index} 
              tag={tag}
              fontWeight={'normal'}
              color={'black'}
              fontSize={['md']}
              _hover={{ bg: 'none' }}
            />
            )
          }
        </Flex>
      </Link>
    </NextLink>
  )
}
