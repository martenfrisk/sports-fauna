import type { AppProps } from 'next/app'
import { UserContextProvider } from '@/utils/user-context'
import '../styles/globals.css'
// import initAuth from '@/utils/initAuth'

// initAuth()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<Component {...pageProps} />
		</UserContextProvider>
	)
}

export default MyApp
