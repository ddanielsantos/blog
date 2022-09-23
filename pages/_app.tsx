import React from 'react'
import { Providers } from '../Providers'

function MyApp({ Component, pageProps }) {
	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	)
}

export default MyApp
