import { Flex, Link, useColorMode } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ThemeToggler } from '../index'

export const Header = () => {
	const { colorMode } = useColorMode()
	return (
		<Flex
			w={'100%'}
			p={'4'}
			bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
			as='header'
			align={'center'}
			justify='space-between'
		>
			<NextLink href='/' passHref>
				<Link fontSize={'xl'}>ddaniel.me</Link>
			</NextLink>

			<ThemeToggler />
		</Flex>
	)
}
