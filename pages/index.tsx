import Link from 'next/link'
import { gql } from 'graphql-request'
import Layout from '@/components/layout'
import { graphQLClient } from '@/utils/graphql-client'
import { getAuthCookie } from '@/utils/auth-cookies'
import useSWR from 'swr'
// import { useState } from 'react'

const Home = ({token, upcomingGames, data}: { token: any, upcomingGames: any, data: any }) => {
	const leagues = data
	const fetcher = async (query) => await graphQLClient(token).request(query)

	const { mutate } = useSWR(
		gql`
      {
        allLeagues {
          data {
            name
          }
        }
      }
    `,
		fetcher
	)


	const joinLeague = async (userID, leagueID) => {
		const mutation = gql`
      mutation JoinLeague($userID: ID!, $leagueID: ID!) {
        partialUpdateLeague(id: $leagueID, data: { members: { connect: $userID } } ) {
          name
        }
      }
    `

		const variables = {
			userID,
			leagueID
		}

		try {
			await graphQLClient(token)
				.setHeader('X-Schema-Preview', 'partial-update-mutation')
				.request(mutation, variables)
			mutate()
		} catch (error) {
			console.error(error)
		}
	}
	// const [errorMessage, setErrorMessage] = useState('')

	// if (errorMessage) return (
	// 	<Layout>
	// 		<div>Error...</div>
	// 	</Layout>
	// )

	return (
		<Layout>
			<div className="flex flex-col items-center w-full mx-auto">
				<Link href="/new">
					Create new league
				</Link>
				{leagues && (
					<div>
						<p>Leagues</p>
						{leagues.data.map((league) => (
							<div className="flex" key={league._id}>
								<div>
									<Link href="/league/[id]" as={`/league/${league._id}`}>
										{league.name}
									</Link>
								</div>
								<span onClick={() => joinLeague()}>Join</span>
								{league.members.data.length > 0 && (
									<div className="ml-2">
											-
										{league.members.data.map((member) => (
											<span className="ml-2" key={member._id}>
												{member.username}
											</span>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				)}
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
	const res = await graphQLClient(token).request(query)
	console.log(res)
	const data = await res
 
	const upcomingGames = await fetch('https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328').then(res => res.json())
	return { props: { 
		token: token || null,
		upcomingGames,
		data: data?.allLeagues
	} }
}

export default Home