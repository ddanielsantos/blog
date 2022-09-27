import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export const Header = () => {
	return (
		<Box w={'100%'} p={'4'} borderBottom={'4px solid #1A202C'} as='header'>
			<NextLink href='/' passHref>
				<Link fontSize={'xl'}>ddaniel.me</Link>
			</NextLink>
		</Box>
	)
}
