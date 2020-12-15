import { gql, request } from 'graphql-request'
import { graphQLClient } from '@/utils/graphql-client'
import { Event, League, LeagueOptions, TeamType, User, UserGuess, WinnerEnum } from './types'

export const createNewUserGuess = async (
	token: string,
	userId: User['_id'],
	eventId: Event['_id'],
	leagueId: League['_id'],
	apiEventId: string,
	winner: WinnerEnum
) => {

	const query = gql`
	mutation CreateNewUserGuess(
		$userId: ID
		$eventId: ID
		$leagueId: ID
		$apiEventId: String
		$winner: WinnerEnum
	) {
		createUserGuess(
			data: {
				user: { 
					connect : $userId 
				} 
				eventId: {
					connect: $eventId
				}
				league: {
					connect: $leagueId
				}
				apiEventId: $apiEventId
				winner: $winner
			}) {
			apiEventId
		}
	}`

	const variables = {
		userId,
		eventId,
		leagueId,
		apiEventId,
		winner,
	}

	try {
		await graphQLClient(token).request(query, variables).then(data => console.log(data))
	} catch (error) {
		console.error(error)
	}
}

export const getEvents = async (team: TeamType, setEvents: any) => {
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
		teamId: team.teamId,
	}
	try {
		request('https://sportsdb.netlify.app/', query, variables).then(
			({ eventsNext }) => {
				setEvents((prev: any) => [
					...prev,
					{
						name: team.teamName,
						events: eventsNext,
					},
				])
			}
		)
	} catch (err) {
		console.error(err)
	}
}

export const getEventsFromDb = async (token: string, team: TeamType, setEvents: any) => {
	const query = gql`
    query GetEventsFromFauna($id: ID!) {
		findTeamTypeByID(id: $id) {
			badge
			awayEvents {
				data {
					awayTeamName
					homeTeamName
					eventId
					dateTime
					divisionName
				}
			}
			homeEvents {
				data {
					awayTeamName
					homeTeamName
					eventId
					dateTime
					divisionName
				}
			}
		}
	}
  `
	const variables = {
		id: team._id,
	}
	await graphQLClient(token).request(query, variables)
		.then(({ findTeamTypeByID }) => {
			setEvents((prev: any) => [
				...prev,
				{
					name: team.teamName,
					events: findTeamTypeByID,
				},
			])
		})
}

export const findUserByID = async (
	token: string,
	id: any,
) => {
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
    }
  `

	const res = await graphQLClient(token).request(query, { id })
	return res
}

export const getLeaguesWithTeams = async (
	token: string,
	id: any,
	setLeagues: any
) => {
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
    }
  `

	await graphQLClient(token)
		.request(query, { id })
		.then((res) => {
			setLeagues(() => res.findUserByID)
			console.log(res)
		})
		.catch((error) => console.error(error))
}

export const getLeagues = async (token: string, id: string) => {
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
												_id
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
												_id
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
    }
  `

	const res = await graphQLClient(token).request(query, { id })
	return res
}

export const getAllTeams = async (leagueId: League['_id']) => {
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
		leagueId,
	}
	const data = request('https://sportsdb.netlify.app/', query, variables)
	return data
}

export const FindLeagueBySlug = async (token: string, slug: League['slug']) => {
	const query = gql`
    query FindLeague($slug: String!) {
      findLeague(slug: $slug) {
        data {
          name
					_id
          options {
            teams {
              teamId
              teamName
              badge
              homeEvents {
                data {
									eventId
                  dateTime
                  homeTeamName
                  awayTeamName
                  _id
                  submittedGuesses {
                    data {
											_id
                      user {
                        username
                        _id
                      }
                      winner
                    }
                  }
                }
              }
              awayEvents {
                data {
									eventId
                  dateTime
                  homeTeamName
                  awayTeamName
                  _id
                  submittedGuesses {
                    data {
											_id
                      user {
                        username
                        _id
                      }
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
  `

	const variables = {
		slug: slug,
	}
	const res = await graphQLClient(token).request(query, variables)
	return res
}

export const RemoveGuess = async (token: string, id: UserGuess['_id']) => {
	const query = gql`
		mutation RemoveUserGuess($id: ID!)
		{
			deleteUserGuess(id: $id) {
				user {
					username
				}
			}
		}
	`
	try {
		await graphQLClient(token).request(query, { id: id })
	}	catch (err) {
		console.error(err)
	}
}

export const FindUserGuessByID = async (token: string) => {
	const query = gql`
		query FindGuess
		{
			allGuesses {
				data {
					winner
					score
					_id
					user {
						_id
					}
					apiEventId
					eventId {
						awayTeamName
						homeTeamName
						homeTeamId {
							badge
						}
						awayTeamId {
							badge
						}
					}
				}
			}
		}`
		
	const res = await graphQLClient(token).request(query)
	return res
}

export const FindLeague = async (token: string, slug: League['slug']) => {
	const query = gql`
    query FindLeague($slug: String!) {
      findLeague(slug: $slug) {
				data {
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
      }
    }
  `

	const variables = {
		slug: slug,
	}
	const res = await graphQLClient(token).request(query, variables)
	return res
}

export const getAllTeamTypes = async (token: string) => {
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

export const updateTeam = async (
	token: string,
	options: LeagueOptions,
	pickedTeam: TeamType[],
	setUpdateMessage: any,
	setErrorMessage: any
) => {
	const filterTeams = pickedTeam.map((x) => x._id)
	const query = gql`
    mutation UpdateLeague(
      $id: ID!
      $teams: [ID]
      $public: Boolean
      $class: LeagueType
    ) {
      updateLeagueOptions(
        id: $id
        data: { teams: $teams, public: $public, class: $class }
      ) {
        public
        class
      }
    }
  `

	const variables = {
		id: options._id,
		teams: filterTeams,
		public: options.public,
		class: options.class,
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

export const getNewLeagueData = async (token: string) => {
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
		}
	`
	const res = await graphQLClient(token).request(query)
	return res
}

export const joinLeague = async (
	token: string,
	userID: any,
	leagueID: League['_id']
) => {
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
    mutation ConnectUser($userID: ID!, $leagueID: [ID]) {
      partialUpdateUser(
        id: $userID
        data: { leagues: { connect: $leagueID } }
      ) {
        _id
      }
    }
	`
	
	const newStandings = gql`
		mutation NewStandings($userID: ID, $leagueID: ID) {
			createStandings(
				data: {
					points: 0
					member: { connect: $userID }
					league: { connect: $leagueID }
				}
			) {
				_id
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
			.catch(err => console.error('leagueError: ', err))
		// mutate()
	} catch (error) {
		console.error('league: ', error)
	}
	try {
		await graphQLClient(token)
			.setHeader('X-Schema-Preview', 'partial-update-mutation')
			.request(mutationUser, variables)
			.catch(err => console.error('userError: ', err))
		// mutate()
	} catch (error) {
		console.error('user: ', error)
	}
	try {
		await graphQLClient(token)
			.request(newStandings, variables)
			.catch(err => console.error('standingsError: ', err))
		// mutate()
	} catch (error) {
		console.error('user: ', error)
	}
}
export const leaveLeague = async (
	token: string,
	userID: any,
	leagueID: League['_id']
) => {
	const mutationLeague = gql`
    mutation LeaveLeague($userID: [ID], $leagueID: ID!) {
      partialUpdateLeague(
        id: $leagueID
        data: { members: { disconnect: $userID } }
      ) {
        name
      }
    }
  `
	const mutationUser = gql`
    mutation DisconnectUser($userID: ID!, $leagueID: [ID]) {
      partialUpdateUser(
        id: $userID
        data: { leagues: { disconnect: $leagueID } }
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
		// mutate()
	} catch (error) {
		console.error(error)
	}
}
