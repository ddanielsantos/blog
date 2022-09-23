import '@fontsource/teko'
import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Global } from '@emotion/react'

const Fonts = () => (
	<Global
		styles={`
      @font-face {
        font-family: 'Virgil';
        font-display: optional;
        font-style: normal;
        font-weight: 700;
        src: url(/fonts/Virgil.woff2) format('woff2')
      }
    `}
	/>
)

const theme = extendTheme({
	fonts: {
		heading: `'Teko', sans-serif`,
		body: `'Teko', sans-serif`
	}
})

export function Providers({ children }) {
	return (
		<ChakraProvider theme={theme}>
			<Fonts />
			{children}
		</ChakraProvider>
	)
}
