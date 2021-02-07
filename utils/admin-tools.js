import { gql, request } from 'graphql-request'
import { graphQLClient } from '@/utils/graphql-client'

export const getEventsAndPopulateDB = async (token) => {
	const queryGetAll = gql`
	{
		allTeams {
    data {
      teamId
      _id
    }
  }
	}
	`

	const queryFetch = gql`
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
			$lastUpdate: String,
			$homeTeamName: String,
			$awayTeamName: String,
			$homeTeamId: ID,
			$awayTeamId: ID,
			$dateTime: String,
			$venue: String,
			$divisionId: ID,
			$divisionName: String,
		) {
			createEvent(data: {
				eventId: $eventId,
				lastUpdate: $lastUpdate,
				homeTeamName: $homeTeamName,
				awayTeamName: $awayTeamName,
				homeTeamId: { connect: $homeTeamId },
				awayTeamId: { connect: $awayTeamId },
				dateTime: $dateTime,
				venue: $venue,
				divisionId: $divisionId,
				divisionName: $divisionName,
			})
		}
	`
	try {
		const { allTeams } = graphQLClient(token).request(queryGetAll)
	
		const findFaunaId = (teamIdParam) => {
			allTeams.find((x) => {
				if (x.teamId === teamIdParam) return x._id
			})
		}
	
		if (allTeams) allTeams.forEach((team) => {
			request('https://sportsdb.netlify.app/', queryFetch, { teamId: team.teamId })
				.then(({eventsNext}) => {
					eventsNext.forEach(async (event) => {
						const variables = {
							eventId: event.id,
							homeTeamName: event.home.name,
							homeTeamId: findFaunaId(event.home.id),
							awayTeamName: event.away.name,
							awayTeamId: findFaunaId(event.away.id),
							dateTime: event.dateTime,
							venue: event.venue,
							divisionId: event.league.id,
							divisionName: event.league.name
						}
						await graphQLClient(token).request(queryPut, variables)
							.then((res) => console.log(res))
							.catch(error => console.error(error))
					})
				})
				.catch(error => console.error(error))
	
		})
	} catch (err) {
		console.error(err)
	}
}
export const getAllUsers = gql`
 {
  allUsers {
    data {
      role
      username
      leagues {
        data {
          name
        }
      }
      email
      favTeam
      _id
    }
  }
}
`

export const queryGetAll = gql`
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
					dateTime
				}
			}
			homeEvents {
				data {
					_ts
					dateTime
				}
			}
		}
	}
}
`
export const queryStandings = gql`
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
export const queryEvents = gql`
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