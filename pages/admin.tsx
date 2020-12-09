import { useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'

import { UserContext } from '@/utils/user-context'
// import { getEventsAndPopulateDB } from '@/utils/admin-tools'
import { getAuthCookie } from '@/utils/auth-cookies'

import { gql, request } from 'graphql-request'
import { graphQLClient } from '@/utils/graphql-client'

const getEventsAndPopulateDB = async (token: any, teamId: any, id: any, allTeams: any) => {


	const queryFetch = gql`
		query GetEvents($teamId: ID) {
			eventsNext(teamId: $teamId) {
				id
				home {
					name
					id
				}
				away {
					name
					id
				}
				name
				venue
				dateTime
				league {
					name
				}
		}
	}
	`

	const queryPut = gql`
		mutation CreateEvent(
			$eventId: String,
			$homeTeamName: String,
			$awayTeamName: String,
			$homeTeamId: ID,
			$awayTeamId: ID,
			$dateTime: String,
			$venue: String,
			$divisionId: ID,
		) {
			createEvent(data: {
				eventId: $eventId,
				homeTeamName: $homeTeamName,
				awayTeamName: $awayTeamName,
				homeTeamId: { connect: $homeTeamId },
				awayTeamId: { connect: $awayTeamId },
				dateTime: $dateTime,
				venue: $venue,
				divisionId: { connect: $divisionId },
			}) {
				_id
				eventId
			}
		}
	`
	try {

		// const findFaunaId = (teamIdParam) => {
		// 	allTeams.find(({ teamId }) => teamId === teamIdParam)
		// }
	
		request('https://sportsdb.netlify.app/', queryFetch, { teamId: teamId })
			.then(({eventsNext}) => {
				eventsNext.forEach(async (event) => {
					const homeTeam = allTeams.find((x) => x.teamId === event.home.id)
					const awayTeam = allTeams.find((x) => x.teamId === event.away.id)
					const variables = {
						eventId: event.id,
						homeTeamName: event.home.name,
						homeTeamId: homeTeam._id,
						awayTeamName: event.away.name,
						awayTeamId: awayTeam._id,
						dateTime: event.dateTime,
						venue: event.venue,
						divisionId: '284421789303439877',
					}
					graphQLClient(token).request(queryPut, variables)
						.then((res) => console.log(res))
						.catch(error => console.error(error))
				})
			})
			.catch(error => console.error(error))
	
	} catch (error) {
		console.error(error)
	}

}

const Admin = ({ token, data }: { token: any, data: any }) => {
	const {userID} = useContext(UserContext)
	return (
		<Layout>
			{userID ? (
				userID.admin ? (
					<div>
						<button>
							Populate database with events
						</button>
						{data && (
							data.allTeams.data.map((team) => (
								<div key={team._id} className="flex justify-between w-full sm:w-1/2">
									<span>
										{team.teamName}
									</span>
									<span className="text-xs">
										Last updated: {new Date(team._ts / 1000 ).toUTCString()} 
									</span>
									<button onClick={() => getEventsAndPopulateDB(token, team.teamId, team._id, data.allTeams.data)}>
										Get events
									</button>
								</div>
							))
						)}
					</div>
				) : (
					<>
						<div>
							Looks like you ended up here by accident. Go home.
						</div>
						<Link href="/">
							<a className="btn-blue">Back</a>
						</Link>
					</>
				)
			) : (
				<div>Loading...</div>
			)}
		</Layout>
	)
}

export default Admin

export const getServerSideProps = async (ctx: any) => {
	const token = getAuthCookie(ctx.req)
	const queryGetAll = gql`
	{
		allTeams {
    data {
      teamId
			teamName
      _id
			_ts
    }
  }
	}
	`
	const data = await graphQLClient(token).request(queryGetAll)
	return {
		props: {
			token: token || null,
			data
		}
	}
}