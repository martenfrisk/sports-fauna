import Head from 'next/head'
import Header from '@/components/header'

export default function Layout({ children }: { children: any }) {
	return (
		<>
			<Head>
				<title>Next FaunaDB test</title>
			</Head>
			<Header />
			<div className="flex flex-wrap justify-center w-full">
				{children}
			</div>
		</>
	)
}