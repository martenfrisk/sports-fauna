import Link from 'next/link'
import Layout from '@/components/layout'
import Leagues from '@/components/leagues'
import { getAuthCookie } from '@/utils/auth-cookies'
import {Trophy, Training, Illustration} from '@/components/svg/landing-page'
// import { useState } from 'react'

const Home = ({token}: { token: any}) => {

	return (
		<Layout>
			<div className="flex flex-col items-center w-full mx-auto mb-10">
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
						<div className="flex flex-col items-center justify-center w-full md:w-1/2">
							<div className="text-xl leading-loose text-center text-blue-700 md:text-4xl">
								<p>Guess football results</p>
								<p>Compete with your friends</p>
							</div>
							<Link href="/signup">
								<a className="px-4 py-px mt-4 mb-12 text-lg font-semibold text-white border-2 border-blue-500 rounded-md shadow-xl bg-gradient-to-br from-blue-600 to-blue-300">Join</a>
							</Link>

							<div className="px-6 py-4 text-lg font-normal text-blue-700 bg-white rounded-md shadow-blue-lg">
								<div className="flex items-center w-full">
									<div className="w-1/2">
										<p className="">1.&nbsp;Create&nbsp;a&nbsp;league</p>
										<p className="mt-2 ">2.&nbsp;Choose&nbsp;teams</p>
									</div>
									<div className="w-32 opacity-50">
										<Trophy />
									</div>
								</div>
								<div className="flex items-center">
									<div className="w-32 opacity-50">
										<Training />
									</div>
									<div className="w-1/2">
										<p className="">3.&nbsp;Invite&nbsp;friends</p>
										<p className="mt-2 ">4.&nbsp;Start&nbsp;guessing!</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-center w-full pt-6 overflow-visible md:w-1/2">
							<Illustration />
						</div>
					</div>
				)}
			</div>
			<style jsx>{`
				.dropshadow {
					filter: drop-shadow(-3px 3px 2px rgba(29, 78, 216, 0.2));
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

