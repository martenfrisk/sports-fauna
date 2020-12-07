import Link from 'next/link'
import { gql } from 'graphql-request'
import Layout from '@/components/layout'
import Leagues from '@/components/leagues'
import { graphQLClient } from '@/utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'
// import { useState } from 'react'

const Home = ({token, upcomingGames, data}: { token: any, upcomingGames: any, data: any }) => {

	// const [errorMessage, setErrorMessage] = useState('')

	// if (errorMessage) return (
	// 	<Layout>
	// 		<div>Error...</div>
	// 	</Layout>
	// )

	return (
		<Layout>
			<div className="flex flex-col items-center w-full mx-auto">
				{data && (
					<>
						<Link href="/new">
							Create new league
						</Link>
						<Leagues leagueData={data} token={token} />
					</>
				)	
				}
				{upcomingGames ? (
					<div className="w-full sm:w-1/2">
						<p className="mb-2 font-light">Next 5 PL Games</p>
						{upcomingGames.events.slice(0, 5).map((event) => (
							<div key={event.idEvent} className="flex items-center justify-between w-full mb-1">
								<div className="w-1/3">
									{event.strHomeTeam}
								</div>
								<div className="w-1/3">
									{event.strAwayTeam}
								</div>
								<div className="w-1/3 text-sm">
									{event.dateEvent}
								</div>
							</div>
						))}
					</div>
				): (
					<div>Loading...</div>
				)}

			</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx: any) {
	const token = getAuthCookie(ctx.req)
	const query = gql`
		{
			allLeagues {
				data {
					_id
					name
					members {
						data {
							_id
							username
						}
					}
					}
				}
		}`
	let res
	
	if (token) res = await graphQLClient(token).request(query)

	const upcomingGames = await fetch('https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328').then(res => res.json())
	return { 
		props: { 
			token: token || null,
			upcomingGames,
			data: res?.allLeagues || null
		} 
	}
}

export default Home