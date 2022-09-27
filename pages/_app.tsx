import React from 'react'
import './styles.css'
import { Providers } from '../Providers'

function MyApp({ Component, pageProps }) {
	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	)
}

export default MyApp
