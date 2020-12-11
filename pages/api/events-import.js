import faunadb from 'faunadb'
// import fetch from 'isomorphic-unfetch'
import { gql, request } from 'graphql-request'
/* 
https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/
https://community.netlify.com/t/scheduling-builds-and-deploys-with-netlify/2563/10
https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/
*/

import { GraphQLClient } from 'graphql-request'

const endpoint = 'https://graphql.fauna.com/graphql'

export const graphQLClient = () => {
	
	const secret = process.env.NEXT_FAUNA_ADMIN_SECRET

	return new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${secret}`,
		},
	})
}

const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.NEXT_PUBLIC_FAUNA_SECRET
})
	
// const url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328'
	
export const getAllTeamTypes = async () => {
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
	let res
	try {
		res = await graphQLClient().request(query)
	} catch (error) {
		console.error(error)
	}
	return res
}


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
}`

function multiUpsert(arrData) {
	return q.Map(
		arrData,
		q.Lambda(
			['d'],
			q.If(
				q.Exists(
					q.Match(
						q.Index('allEvents'),
						q.Select(['data', 'eventId'], q.Var('d'))
					)
				),
				q.Get(
					q.Match(
						q.Index('allEvents'),
						q.Select(['data', 'eventId'], q.Var('d'))
					)
				),
				q.Create(q.Collection('Event'), q.Var('d'))
			)
		)
	)
}

export default async() => {
	const { allTeams } = await getAllTeamTypes().catch(err => console.error(err))
	if (allTeams) allTeams.data.forEach(async (team ) => {
		const variables = {
			teamId: team.teamId
		}
		const data = await request('https://sportsdb.netlify.app/', queryFetch, variables)
			.then(data => {
				const newData = []
				const { eventsNext } = data
				eventsNext.filter(event => {
					const data = {
						eventId: event.idEvent,
						homeTeamName: event.strHomeTeam,
						awayTeamName: event.strAwayTeam,
						homeTeamId: event.idHomeTeam,
						awayTeamId: event.idAwayTeam,
						dateTime: event.strTimestamp,
						venue: event.strVenue,
						divisionName: event.strLeague,
						divisionId: event.idLeague,
					}
					newData.push({data})
					return data
				})
				client.query(multiUpsert(newData))
					.catch(err => console.error('Error: %s', err))
			})
			.catch(err => console.error(err))
		console.log(data)
		return data
	})

}
