import React from 'react'

export function Divider({ colorMode }) {
	return (
		<hr
			style={{
				backgroundColor: `${colorMode === 'light' ? 'black' : 'white'}`,
				borderColor: `${colorMode === 'light' ? 'black' : 'white'}`,
				borderRadius: 2,
				borderWidth: '1px',
				marginBottom: '1em'
			}}
		/>
	)
}
