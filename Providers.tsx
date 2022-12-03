import '@fontsource/montserrat'
import '@fontsource/noto-sans'
import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	fonts: {
		heading: `'Montserrat Black', sans-serif`,
		body: `'Noto Sans', sans-serif`
	}
})

export function Providers({ children }) {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
