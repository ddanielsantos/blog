import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
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

export function Providers({ children }) {
  return (
    <ChakraProvider>
    <Fonts/>
      {children}
    </ChakraProvider>
  )
}
