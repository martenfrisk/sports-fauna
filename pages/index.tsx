import Link from 'next/link'
import { gql } from 'graphql-request'
import Layout from '@/components/layout'
import Leagues from '@/components/leagues'
import { graphQLClient } from '@/utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'
// import { useState } from 'react'

const Home = ({token, data}: { token: any, data: any }) => {

	return (
		<Layout>
			<div className="flex flex-col items-center w-full mx-auto">
				{data ? (
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
						<Leagues leagueData={data} token={token} />
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
	
	let data
	const query = gql`
	{
		allLeagues {
			data {
				_id
				name
				slug
				members {
					data {
						username
						_id
					}
				}
				}
			}
	}`

	if (token) data = await graphQLClient(token).request(query)
	
	return { 
		props: { 
			token: token || null,
			data: data?.allLeagues || null
		} 
	}
}

export default Home