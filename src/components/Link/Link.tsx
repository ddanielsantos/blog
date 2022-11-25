import React from 'react'
import NextLink from 'next/link'
import { Link as L, useColorMode } from '@chakra-ui/react'

type LinkProps = {
	href: string
	title: string
	rightIcon?: React.ReactElement
}

export function Link(props: LinkProps) {
	const { colorMode } = useColorMode()
	return (
		<NextLink href={props.href} passHref>
			<L
				position={'relative'}
				padding={'2'}
				alignSelf={'flex-end'}
				borderRadius={'7px'}
				paddingInline={'4'}
				textAlign={'right'}
				fontSize='sm'
				display={'flex'}
				gap={'1'}
				alignItems='center'
				fontWeight='bold'
				transition={'0.3s all'}
				border={`2px solid`}
				borderColor={colorMode === 'light' ? 'gray.800' : 'gray.50'}
				bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
				_hover={{
					color: `${colorMode === 'light' ? 'gray.50' : 'gray.800'}`,
					bg: `${colorMode === 'light' ? 'gray.800' : 'gray.50'}`,
					gap: '3'
				}}
				_focus={{
					outline: '3px solid #63B3ED'
				}}
			>
				{props.title} {props.rightIcon}
			</L>
		</NextLink>
	)
}
