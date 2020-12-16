import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout'
import Leagues from '@/components/leagues'
import { getAuthCookie } from '@/utils/auth-cookies'
import { Trophy, Training } from '@/components/svg/landing-page'
// import { useState } from 'react'

const Home = ({token}: { token: any}) => {

	return (
		<Layout>
			<div className="flex flex-col items-center w-full mx-auto mb-0">
				{token ? (
					<div className="flex flex-col flex-wrap w-full sm:flex-row">
						<div className="flex justify-center w-full sm:items-center sm:w-1/2">
							<div className="my-6 space-x-2">
								<Link href="/league/new">
									<a className="btn-blue">
									Create League
									</a>
								</Link>
								<Link href="/guess">
									<a className="btn-blue">
									Start guessing
									</a>
								</Link>
							</div>

						</div>
						<div className="w-full sm:w-1/2">
							<Leagues token={token} />
						</div>
					</div>
				)	 : (
					<div className="flex flex-wrap w-full">
						<div className="flex flex-col items-center w-full text-xl font-normal text-center text-blue-600 font-logo md:text-3xl">
							<h1>Guess football results</h1>
							<h1 className="mt-4 mb-6">Compete with your friends</h1>
							<Link href="/signup">
								<a className="text-lg shadow-blue-lg btn-blue">Join</a>
							</Link>
						</div>

						<div className="flex flex-col items-center justify-center w-full mt-6 md:w-1/2">

							<div className="px-2 overflow-hidden text-xl font-light text-blue-700 lowercase bg-white rounded-md sm:px-12 neumorph">
								<div className="flex items-center w-full">
									<div className="w-1/2">
										<p className="">1.&nbsp;Create&nbsp;a&nbsp;league</p>
										<p className="mt-2 ml-4">2.&nbsp;Choose&nbsp;teams</p>
									</div>
									<div className="w-32 transform scale-150 translate-x-10 -translate-y-10 opacity-50">
										<Trophy />
									</div>
								</div>
								<div className="flex items-center">
									<div className="w-32 transform scale-150 -translate-x-10 translate-y-10 opacity-50">
										<Training />
									</div>
									<div className="w-1/2">
										<p className="">3.&nbsp;Invite&nbsp;friends</p>
										<p className="mt-2 ml-4">4.&nbsp;Start&nbsp;guessing!</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-end justify-center w-full pt-6 md:w-1/2" style={{ filter: 'drop-shadow(5px 5px 8px rgba(59, 130, 246, 0.3))' }}>
							<Image src="/person.png" width={279} height={463} alt="Picture of person looking intrigued" />
						</div>
					</div>
				)}
			</div>
			<style jsx>{`
				.dropshadow {
					filter: drop-shadow(-3px 3px 2px rgba(29, 78, 216, 0.2));
				}
				.neumorph {
					mix-blend-mode: normal;
					box-shadow: 
						-10px 10px 20px rgba(224, 224, 224, 0.2), 
						10px -10px 20px rgba(224, 224, 224, 0.2), 
						-10px -10px 20px rgba(255, 255, 255, 0.9), 
						10px 10px 25px rgba(224, 224, 224, 0.9);
				}
			`}</style>
		</Layout>
	)
}

export async function getServerSideProps(ctx: any) {
	const token = getAuthCookie(ctx.req)
	
	return { 
		props: { 
			token: token || null,
		} 
	}
}

export default Home

