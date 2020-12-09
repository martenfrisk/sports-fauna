import { gql, request } from 'graphql-request'
import { graphQLClient } from '@/utils/graphql-client'

export const getEvents = async (team, setEvents) => {
	const query = gql`
		query GetEvents($teamId: ID) {
			eventsNext(teamId: $teamId) {
				home {
					name
					id
				}
				away {
					name
					id
				}
				name
				dateTime
				league {
					name
				}
		}
	}
	`
	const variables = {
		teamId: team.teamId
	}
	try {
		request('https://sportsdb.netlify.app/', query, variables)
			.then(({eventsNext}) => {
				setEvents((prev) => ([
					...prev, 
					{ 
						name: team.teamName,
						events: eventsNext
					}
				]))
			})
	} catch (err) {
		console.error(err)
	}
}

export const getLeaguesWithTeams = async (token, id, setLeagues) => {
	const query = gql`
		query FindUser($id: ID!) {
			findUserByID(id: $id) {
				username
				leagues {
					data {
						name
						slug
					}
				}
			}
		}`
	
	await graphQLClient(token).request(query, { id })
		.then((res) => {
			setLeagues(() => res.findUserByID)
			console.log(res)
		})
		.catch((error) => console.error(error))
}

export const getLeagues = async (token, id) => {
	const query = gql`
		query FindUser($id: ID!) {
			findUserByID(id: $id) {
				username
				leagues {
					data {
						name
						slug
						options {
							teams {
								teamId
								teamName
								badge
								homeEvents {
									data {
										dateTime
										homeTeamName
										awayTeamName
										_id
										submittedGuesses {
											data {
												user {
													username
													_id
												}
												score
												winner
											}
										}
									}
								}
								awayEvents {
									data {
										dateTime
										homeTeamName
										awayTeamName
										_id
										submittedGuesses {
											data {
												user {
													username
													_id
												}
												score
												winner
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}`
	
	const res = await graphQLClient(token).request(query, { id })
	return res
}

export const getAllTeams = async (leagueId) => {
	const query = gql`
		query SearchAllTeams($leagueId: ID) {
			teamSearch(leagueId: $leagueId) {
				id
				name
				badgeImg
				shortName
		}
	}
	`
	const variables = {
		leagueId
	}
	const data = request('https://sportsdb.netlify.app/', query, variables)
	return data
}

export const FindLeague = async (token, id) => {
	const query = gql`
		query FindLeague($id: ID!) {
			findLeagueByID(id: $id) {
				name
				slug
				_id
				options {
					_id
					class
					public
					teams {
						_id
						teamName
						teamId
						badge
					}
					divisions
				}
				standings {
					data {
						_id
						member {
							username
						}
						points
					}
				}
				members {
					data {
						_id
						username
						email
					}
				}
			}
	}`

	const variables = {
		id: id
	}
	const res = await graphQLClient(token).request(query, variables)
	return res
}

export const getAllTeamTypes = async (token) => {
	const query = gql`
		{
			allTeams {
				data {
					_id
					teamId
					teamName
					badge
				}
			}
		}
	`
	const res = await graphQLClient(token).request(query)
	return res
}

export 	const updateTeam = async (token, options, pickedTeam, setUpdateMessage, setErrorMessage) => {
	const filterTeams = pickedTeam.map((x) => x._id)
	const query = gql`
		mutation UpdateLeague($id: ID!, $teams: [ID], $public: Boolean, $class: LeagueType) {
			updateLeagueOptions(id: $id, data: { teams: $teams, public: $public, class: $class }) {
				public
				class
			}
		}
	`

	const variables = {
		id: options._id,
		teams: filterTeams,
		public: options.public,
		class: options.class
	}

	try {
		await graphQLClient(token).request(query, variables)
		setTimeout(() => {
			setUpdateMessage('')
		}, 4000)
		setUpdateMessage('Changes saved')
	} catch (error) {
		console.error(error)
		setErrorMessage(error.message)
	}
}


export const getNewLeagueData = async (token, setLeagueInfo) => {
	const query = gql`
		{
			allLeagues {
				data {
					_id
					name
					members {
						data {
							username
							_id
						}
					}
				}
			}
		}
	`

	await graphQLClient(token)
		.request(query)
		.then((res) => setLeagueInfo(res.allLeagues))
}

export const joinLeague = async (token, userID, leagueID, setLeagueInfo) => {
	const mutationLeague = gql`
		mutation JoinLeague($userID: [ID], $leagueID: ID!) {
			partialUpdateLeague(
				id: $leagueID
				data: { members: { connect: $userID } }
			) {
				name
			}
		}
	`
	const mutationUser = gql`
		mutation ConnectUser(
			$userID: ID!
			$leagueID: [ID]
		) {
			partialUpdateUser(
				id: $userID
				data: { leagues: { connect: $leagueID }}
			) {
				username
			}
	}`

	const variables = {
		userID,
		leagueID,
	}

	try {
		await graphQLClient(token)
			.setHeader('X-Schema-Preview', 'partial-update-mutation')
			.request(mutationLeague, variables)
		await graphQLClient(token)
			.setHeader('X-Schema-Preview', 'partial-update-mutation')
			.request(mutationUser, variables)
			.then(getNewLeagueData(token, setLeagueInfo))
		// mutate()
	} catch (error) {
		console.error(error)
	}
}
export const leaveLeague = async (token, userID, leagueID, setLeagueInfo) => {
	const mutationLeague = gql`
		mutation LeaveLeague(
			$userID: [ID]
			$leagueID: ID!
		) {
			partialUpdateLeague(
				id: $leagueID
				data: { members: { disconnect: $userID } }
			) {
				name
			}
		}	
	`
	const mutationUser = gql`
		mutation DisconnectUser(
			$userID: ID!
			$leagueID: [ID]
		) {
			partialUpdateUser(
				id: $userID
				data: { leagues: { disconnect: $leagueID }}
			) {
				username
			}
		}
	`

	const variables = {
		userID,
		leagueID,
	}

	try {
		await graphQLClient(token)
			.setHeader('X-Schema-Preview', 'partial-update-mutation')
			.request(mutationLeague, variables)
		await graphQLClient(token)
			.setHeader('X-Schema-Preview', 'partial-update-mutation')
			.request(mutationUser, variables)
			.then(getNewLeagueData(token, setLeagueInfo))
		// mutate()
	} catch (error) {
		console.error(error)
	}
}