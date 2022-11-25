import { useRouter } from 'next/router'
import { Link, useColorMode } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

export function BackButton() {
	const router = useRouter()
	const { colorMode } = useColorMode()

	const onClick = () => {
		router.back()
	}

	return (
		<Link
			onClick={onClick}
			position={'relative'}
			py={'1'}
			px={'2'}
			borderRadius={'7px'}
			fontSize='xs'
			width='fit-content'
			transition={'background-color 0.3s'}
			border={`2px solid`}
			borderColor={colorMode === 'light' ? 'gray.800' : 'gray.50'}
			bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
			_hover={{
				color: `${colorMode === 'light' ? 'gray.50' : 'gray.800'}`,
				bg: `${colorMode === 'light' ? 'gray.800' : 'gray.50'}`
			}}
		>
			<ChevronLeftIcon />
			go back
		</Link>
	)
}
