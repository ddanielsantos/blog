import { useColorMode, IconButton, IconButtonProps } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

type ThemeTogglerProps = Omit<IconButtonProps, 'aria-label'>

export function ThemeToggler(props: ThemeTogglerProps) {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<IconButton
			onClick={toggleColorMode}
			aria-label='theme toggler'
			borderRadius={'7px'}
			fontSize='sm'
			size='sm'
			bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
			transition={'0.3s all'}
			outline={`2px solid`}
			outlineColor={colorMode === 'light' ? 'gainsboro' : 'gray.50'}
			_hover={{}}
			_focus={{
				outline: '3px solid #63B3ED'
			}}
			icon={
				colorMode === 'light' ? (
					<MoonIcon color={'gray.800'} />
				) : (
					<SunIcon color='gray.50' />
				)
			}
			{...props}
		/>
	)
}
