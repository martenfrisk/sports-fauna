import Head from 'next/head'
import Header from '@/components/header'

export default function Layout({ children }: { children: any }) {
	return (
		<div className="w-screen h-full min-h-screen px-4 py-6 sm:px-10 radialgradient">
			<Header />
			<div className="min-h-screen bg-white bg-opacity-50 border-4 border-blue-400 rounded-3xl border-opacity-30 innerbox">

				<Head>
					<title>Sport Guess - guess football results with friends</title>
					<meta name="Description" content="Guess football results and compete with your friends." />
				</Head>
				<div className="w-full max-w-6xl px-6 mx-auto">
					{children}
				</div>
			</div>
			<style global jsx>{`
				.radialgradient {
					radial-gradient(37.39% 52.36% at 29.55% 62.61%, rgba(63, 131, 248, 0.74) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(19.68% 31.44% at 84.41% 34.94%, rgba(118, 169, 250, 0.87) 0%, #FFFFFF 100%);
				}
				.innerbox {
					box-shadow: -11px 11px 22px rgba(28, 100, 242, 0.1), 11px -11px 22px rgba(28, 100, 242, 0.1), -11px -11px 22px rgba(255, 255, 255, 0.9), 11px 11px 28px rgba(28, 100, 242, 0.4), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(28, 100, 242, 0.5);
				}
			
			`}</style>
		</div>
	)
}
