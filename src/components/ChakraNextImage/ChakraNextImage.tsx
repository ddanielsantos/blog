import { chakra } from '@chakra-ui/react'
import Image from 'next/image'

export const ChakraNextImage = chakra(Image, {
	baseStyle: { maxH: 120, maxW: 120 },
	shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})
