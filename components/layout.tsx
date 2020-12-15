import Head from 'next/head'
import Header from '@/components/header'

export default function Layout({ children }: { children: any }) {
	return (
		<div className="w-screen h-full min-h-screen px-4 py-4 radialgradient">
			<div className="bg-white border-4 border-blue-400 bg-opacity-85 rounded-3xl shadow-blue-lg border-opacity-30">

				<Head>
					<title>Sport Guess - guess football results with friends</title>
				</Head>
				<Header />
				<div className="w-full max-w-6xl px-6 mx-auto">
					{children}
				</div>
			</div>
			<style global jsx>{`
			.radialgradient {
				background: linear-gradient(221deg, #ffffff, #cae8ff, #f1f9ff, #a0d6ff);
				background-size: 800% 800%;
				animation: AnimationName 40s ease infinite;
			}
				
			@keyframes AnimationName {
				0%{background-position:84% 0%}
				50%{background-position:17% 100%}
				100%{background-position:84% 0%}
			}
			`}</style>
		</div>
	)
}