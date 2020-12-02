import type { AppProps } from 'next/app'
import { UserContextProvider } from '@/utils/user-context'
import 'tailwindcss/tailwind.css'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<Component {...pageProps} />
		</UserContextProvider>
	)
}

export default MyApp
