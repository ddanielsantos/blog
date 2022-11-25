import { Box, useColorMode } from '@chakra-ui/react'

export const Footer = () => {
	const { colorMode } = useColorMode()
	return (
		<Box
			as={'footer'}
			display={'flex'}
			w={'100%'}
			p={'1.5rem'}
			bg={colorMode === 'light' ? 'gray.200' : 'gray.900'}
			marginTop={'auto'}
		>
			<span style={{ textAlign: 'center', flex: 1 }}>
				built with love, Javascript and a ton of libs
			</span>
		</Box>
	)
}
