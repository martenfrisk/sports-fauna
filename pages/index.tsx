import Link from 'next/link'
import Layout from '@/components/layout'
import Leagues from '@/components/leagues'
import { getAuthCookie } from '@/utils/auth-cookies'
// import { useState } from 'react'

const Home = ({token}: { token: any}) => {

	return (
		<Layout>
			<div className="flex flex-col items-center w-full mx-auto">
				{token ? (
					<>
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
						<Leagues token={token} />
					</>
				)	 : (
					<>
						<p>You are not logged in.</p>
						<Link href="/login">
							<a className="btn-blue">
								Login
							</a>
						</Link>
						<p className="mt-4">or</p>
						<Link href="/signup">
							<a className="btn-blue">
								Sign up
							</a>
						</Link>
					</>
				)}
			</div>
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