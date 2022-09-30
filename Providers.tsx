import '@fontsource/teko'
import '@fontsource/titillium-web'
import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	fonts: {
		heading: `'Teko', sans-serif`,
		body: `'Titillium Web', sans-serif`
	}
})

export function Providers({ children }) {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
