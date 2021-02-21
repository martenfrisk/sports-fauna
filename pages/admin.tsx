import GuessItem from '@/components/admin/guess-item'
import FinishedEvents from '@/components/admin/finished-events'
import { useContext, useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout'
import EditUser from '@/components/admin/edit-user'
import { UserContext } from '@/utils/user-context'
// import { getEventsAndPopulateDB } from '@/utils/admin-tools'
import { getAuthCookie } from '@/utils/auth-cookies'

import { Event, Standings, TeamType } from '@/utils/types/types'
import {
	getAllUsers,
	queryGetAll,
	queryStandings,
	queryEvents,
} from '@/utils/admin-tools'
import { db } from '@/utils/firebase'
import { isEventFinished } from '@/utils/converters'
import { convertWinner } from '@/utils/extra-functions'

// const getEventsAndPopulateDB = async () => {

// }

const Admin = ({
	token,
	events,
	users,
	eventsLastUpdate,
}: {
	token: any
	events: any
	users: any
	eventsLastUpdate: any
}) => {
	const { userID } = useContext(UserContext)
	const [updateMsg, setUpdateMsg] = useState('')
	const importEvents = async () => {
		await fetch('/api/functions/events-import', {
			method: 'POST',
			body: JSON.stringify({ league: 2021 })
		}).then((res) => res.text()).then((data) => setUpdateMsg(data))
	}
	// const [standingsUpdated, setStandingsUpdated] = useState([{_id: ''}])

	// const getEventResult = async (eventId: string) => {
	// }

	// const updateStandings = async (leagueId: string, userId: string, points: number, guessId: string) => {
	// }

	// const eventsWithGuess = events.filter((event: Event) => event.submittedGuesses.data.length > 0)

	// const pastEventsWithGuess = eventsWithGuess.map((event: Event) => {
	// 	const eventDate = new Date(event.dateTime)
	// 	const today = new Date()
	// 	if (eventDate < today) {
	// 		return event
	// 	}
	// })

	return (
		<Layout>
			<div className="min-h-screen my-10">
				{eventsLastUpdate && (
					<div>
						<p>
							Events last imported: {new Date(eventsLastUpdate).toISOString()}
						</p>
						<p>Today: {new Date().toISOString()}</p>
						{updateMsg === '' ? (
							<button onClick={importEvents} className="px-2 py-px border-2 border-blue-400 rounded-md" type="button">Click to import new events/results</button>
						) : (
							<p>{updateMsg}</p>
						)}
					</div>
				)}
				{users && (
					<div>
						<p className="mb-2 text-lg">Users</p>
						{users.map((user) => (
							<div key={user.email} className="mb-4 ml-2">
								<p>User: {user.email}</p>
								{user.guess && (
									<>
										{Object.entries(user.guess).map(
											([guessKey, guessValue]) => (
												<>
													<p>League name: {guessKey}</p>
													{Object.entries(guessValue).map(
														([eventId, guessOptions]) => {
															const event = events.find(
																(i) => i.id === guessOptions.eventId
															)
															if (
																isEventFinished(
																	new Date(guessOptions.eventDate)
																) &&
																!guessOptions.corrected &&
																eventId !== 'points' &&
																event.score.winner
															) {
																return (
																	<div
																		key={guessKey}
																		className="px-4 py-2 my-2 bg-blue-50"
																	>
																		<p className="mb-2 text-lg">
																			Event id: {eventId}
																		</p>
																		<GuessItem
																			guessOptions={guessOptions}
																			userId={user.id}
																			leagueId={guessKey}
																			eventId={eventId}
																			event={event}
																		/>
																	</div>
																)
															}
														}
													)}
												</>
											)
										)}
									</>
								)}
							</div>
						))}
					</div>
				)}

				{/* {userID ? (
					userID.admin ? (
						<div>
							<div>
								<details>
									<summary>Update standings</summary>
									{pastEventsWithGuess && pastEventsWithGuess.map((event: Event) => {
										const resultForThis = results.find(x => x.eventId === event.eventId)
										if (event) {
											getEventResult(event.eventId)
										}
										return (
											<FinishedEvents key={event._id} resultForThis={resultForThis} event={event}  updateStandings={updateStandings} setStandingsUpdated={setStandingsUpdated} standingsUpdated={standingsUpdated} />	
										)
									})}
								</details>
							</div>
							<details>
								<summary>
							Populate database with events

								</summary>
								{data && (
									data.allTeams.data.map((team: TeamType) => {
										const games = [...team.awayEvents.data, ...team.homeEvents.data].sort((a, b) => b._ts - a._ts )
										return (
											<div key={team._id} className="flex justify-between w-full ">
												<span>
													{team.teamName}
												</span>
												<span className="text-xs">
										Last updated: {new Date(games[0]._ts / 1000 ).toUTCString()} 
												</span>
												<button 
												// onClick={() => getEventsAndPopulateDB(token, team.teamId, team._id, data.allTeams.data)}
												>
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
										)})
								)}
						
							</details>
							{users && (
								<details>
									<summary>User administration</summary>
									{users.allUsers.data.map(user => (
										<EditUser key={user._id} user={user} token={token} />
									))}
								</details>
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
				)} */}
			</div>
		</Layout>
	)
}

export default Admin

export const getServerSideProps = async (ctx: any) => {
	const token = getAuthCookie(ctx.req)

	const users = []
	await db
		.ref('users')
		.once('value')
		.then((DataSnapshot) => {
			DataSnapshot.forEach((singleUser) => {
				users.push({ ...singleUser.val(), id: singleUser.key })
			})
		})
	const events = []
	await db
		.ref('teams/2021')
		.once('value')
		.then((TeamSnapshot) => {
			TeamSnapshot.forEach((singleTeam) => {
				const teamId = singleTeam.child('id').val()
				singleTeam.child('events').forEach((EventSnap) => {
					events.push({
						...EventSnap.val(),
						teamId,
					})
				})
			})
		})
	let eventsLastUpdate = ''
	await db
		.ref('teams/updateHistory/lastUpdate')
		.once('value')
		.then((Snap) => (eventsLastUpdate = Snap.val()))
	return {
		props: {
			token: token || null,
			users: users || null,
			events: events || null,
			eventsLastUpdate: eventsLastUpdate || null,
		},
	}
}
