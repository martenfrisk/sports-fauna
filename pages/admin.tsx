import { useContext, useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'

import { UserContext } from '@/utils/user-context'
// import { getEventsAndPopulateDB } from '@/utils/admin-tools'
import { getAuthCookie } from '@/utils/auth-cookies'

import { gql, GraphQLClient, request } from 'graphql-request'
import { Event, Standings, TeamType, UserGuess } from '@/utils/types'
import { graphQLClient } from '@/utils/graphql-client'


const adminGraphQLClient = () => {
	const endpoint = 'https://graphql.fauna.com/graphql'

	const secret = process.env.NEXT_PUBLIC_FAUNA_ADMIN_SECRET

	return new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${secret}`,
		},
	})
}


const getEventsAndPopulateDB = async (token: any, teamId: TeamType['_id'], id: any, allTeams: [TeamType]) => {


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
				finished: false,
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
					console.log(event)
					if (event.league[0].name !== 'English Premier League') return null
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
						divisionId: '284619406832566789',
					}
					adminGraphQLClient().request(queryPut, variables)
						.then((res) => console.log(res))
						.catch(error => console.error(error))
				})
			})
			.catch(error => console.error(error))
	
	} catch (error) {
		console.error(error)
	}

}

const Admin = ({ token, data, events }: { token: any, data: any, standings: [Standings], events: [Event] }) => {

	const {userID} = useContext(UserContext)
	const [results, setResults] = useState([])
	const [standingsUpdated, setStandingsUpdated] = useState([{_id: ''}])

	const getEventResult = async (eventId: string) => {
		const query = gql`
		query GetEventResult($id: ID!) {
		event(id: $id) {
			id
			name
			away {
				score
			}
			home {
				score
			}
		}
	}
	
		`
		
		try {
			request('https://sportsdb.netlify.app/', query, { id: eventId })
				.then(({event}) => {
					console.log(event)
					const obj = {
						eventId,
						data: event
					}
					if (results.some(x => x.eventId === eventId)) {
						return null
					} else {
						setResults((prev) => [...prev, obj])
					}
				})
				.catch(error => console.error(error))
		
		} catch (error) {
			console.error(error)
		}
	}

	const updateStandings = async (leagueId: string, userId: string, points: number, guessId: string) => {
		const getStandings = gql`
		query GetStandingsByID($id: ID!)
			{
				findLeagueByID(id: $id) {
					standings {
						data {
							_id
							member {
								_id
							}
							points
						}
					}
				}
			}
		`
		
		const query = gql`
			mutation PartialUpdateStandings(
				$id: ID!
				$user: ID
				$points: Int
			) {
			updateStandings(
				id: $id
				data: {
					member: { connect: $user }
					points: $points
				}
			) {
				points
				member {
					username
				}
				_id
			}
		}
		`
		const markCorrected = gql`
			mutation MarkGuessCorrect($id: ID!) {
				updateUserGuess(
					id: $id
					data: {
						corrected: true
					}
					) {
						_id
					}
			}
		`
		
		try {
			await adminGraphQLClient()
				.request(getStandings, { id: leagueId })
				.then(async ({findLeagueByID}) => {
					console.log('findLeagueByID: ', findLeagueByID)
					const standingsId = findLeagueByID.standings.data.filter((x: Standings) => x.member._id === userId)
					console.log('standingsId: ', standingsId)
					console.log({points})
					const newVars = {
						points: standingsId[0].points + points,
						id: standingsId[0]._id,
						user: userId
					}
					console.log({newVars})
					await adminGraphQLClient()
						.request(query, newVars)
						.then((res) => console.log(res))
						.catch(error => console.error(error))
						.then(async () => {
							await adminGraphQLClient()
								.request(markCorrected, { id: guessId })
								.then((res) => console.log(res))
								.catch(error => console.error(error))
						})
				})
				.then((res) => console.log(res))
				.catch(error => console.error(error))
		} catch (err) {
			console.error(err)
		}
	}

	const eventsWithGuess = events.filter((event: Event) => event.submittedGuesses.data.length > 0)

	const pastEventsWithGuess = eventsWithGuess.filter((event: Event) => {
		const eventDate = new Date(event.dateTime)
		const today = new Date()
		if (eventDate.getDate() < today.getDate()) {
			return event
		} else {
			return null
		}
	})
	
	return (
		<Layout>
			{userID ? (
				userID.admin ? (
					<div>
						<div>
							{pastEventsWithGuess && pastEventsWithGuess.map((event: Event) => {
								const resultForThis = results.find(x => x.eventId === event.eventId)
								getEventResult(event.eventId)
								return (
									<div key={event._id} className="flex justify-between">
										<div>
											{event.homeTeamId.teamName} vs {event.awayTeamId.teamName}
										</div>
										<div>
											{new Date(event.dateTime).toDateString()}
										</div>
										{resultForThis && (
											<>
												<div className="ml-4">
													{event.submittedGuesses.data.map((guess: UserGuess) => {
														let correctWinner: string
														if (resultForThis.data[0].home.score > resultForThis.data[0].away.score) correctWinner = 'HOMEWIN'
														if (resultForThis.data[0].home.score < resultForThis.data[0].away.score) correctWinner = 'AWAYWIN'
														if (resultForThis.data[0].home.score === resultForThis.data[0].away.score) correctWinner = 'DRAW'
														console.log({guess})
														return (
															<div
																key={guess._id}
															>
																{guess.corrected ? (
																	<span className="mr-2 text-xs bg-green-100">Already done</span>
																) : (
																	<button
																		className="mr-2" 
																		onClick={() => {
																			updateStandings(
																				guess.league._id, guess.user._id,
																				correctWinner === guess.winner ? 3 : 0, guess._id
																			)
																			setStandingsUpdated(() => [...standingsUpdated, { _id: guess._id }])
																		}}
																	>{standingsUpdated.some(x => x._id === guess._id) ? <span className="line-through">Inserted</span> : 'Update standings'}</button>
																)}
																{guess.user.username} - {guess.winner}
															</div>
														)})}
												</div>
												<div>
											Result: {resultForThis.data[0].home.score} - {resultForThis.data[0].away.score}
												</div>
											</>
										)}
									</div>
								)}
							)}
						</div>
						<div>
							Populate database with events
						</div>
						{data && (
							data.allTeams.data.map((team: TeamType) => (
								<div key={team._id} className="flex justify-between w-full ">
									<span>
										{team.teamName}
									</span>
									<span className="text-xs">
										Last updated: {new Date(team._ts / 1000 ).toUTCString()} 
									</span>
									<button onClick={() => getEventsAndPopulateDB(token, team.teamId, team._id, data.allTeams.data)}>
										Get events
									</button>
									<span>{team.awayEvents.data.length === 0 && team.awayEvents.data.length === 0 ? (
										<span className="bg-red-100">
											No events
										</span>
									) : (
										<span className="bg-green-100">
												Has events
										</span>
									)}</span>
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
				awayEvents {
					data {
						_ts
					}
				}
				homeEvents {
					data {
						_ts
					}
				}
			}
  	}
	}
	`
	const queryStandings = gql`
		{
			allLeagues {
				data {
					standings {
						data {
							league {
								name
							}
							points
							member {
								username
							}
						}
					}
				}
			}
		}
	`
	const queryEvents = gql`
		{
			allEvents {
				data {
					_id
					eventId
					dateTime
					homeTeamId {
						teamId
						teamName
					}
					awayTeamId {
						teamId
						teamName
					}
					dateTime
					submittedGuesses {
						data {
							_id
							corrected
							winner
							league {
								_id
							}
							user {
								username
								_id
							}
						}
					}
				}
			}
		}
	`

	const data = await graphQLClient(token).request(queryGetAll)
	const standings = await graphQLClient(token).request(queryStandings)
	const events = await graphQLClient(token).request(queryEvents)
	return {
		props: {
			token: token || null,
			data,
			standings,
			events: events?.allEvents.data
		}
	}
}