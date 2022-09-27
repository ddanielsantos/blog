import { Box } from '@chakra-ui/react'

export const Footer = () => {
	return (
		<Box as={'footer'} display={'flex'} w={'100%'} p={'1.5rem'}>
			<span style={{ textAlign: 'center', flex: 1 }}>
				built with love, Javascript and a ton of libs
			</span>
		</Box>
	)
}
