import Head from 'next/head'
import Header from '@/components/header'

export default function Layout({ children }: { children: any }) {
	return (
		<>
			<Head>
				<title>Next FaunaDB test</title>
			</Head>
			<Header />
			<div className="w-full max-w-6xl px-6 mx-auto">
				{children}
			</div>
		</>
	)
}