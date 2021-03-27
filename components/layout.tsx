import Head from 'next/head'
import Header from '@/components/header'

export default function Layout({ children }: { children: any }) {
	return (
		<main className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr auto' }}>
			<Head>
				<title>Sport Guess - guess football results with friends</title>
				<meta
					name="Description"
					content="Guess football results and compete with your friends."
				/>
			</Head>
			<Header />
			<div className="relative z-10 w-full max-w-6xl px-6 mx-auto">
				{children}
			</div>
			<div className="fixed bottom-0 z-0 w-screen transform -skew-y-12 bg-blue-400 opacity-50 h-2/3">
			</div>
		</main>
	)
}
