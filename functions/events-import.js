import faunadb from 'faunadb'
import fetch from 'isomorphic-unfetch'

/* 
https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/
https://community.netlify.com/t/scheduling-builds-and-deploys-with-netlify/2563/10
https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/
*/

const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.NEXT_PUBLIC_FAUNA_SECRET
})
	
const url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328'
	
function multiUpsert(arrData) {
	return q.Map(
		arrData,
		q.Lambda(
			['d'],
			q.If(
				q.Exists(
					q.Match(
						q.Index('unique_Event_eventId'),
						q.Select(['data', 'eventId'], q.Var('d'))
					)
				),
				q.Get(
					q.Match(
						q.Index('unique_Event_eventId'),
						q.Select(['data', 'eventId'], q.Var('d'))
					)
				),
				q.Create(q.Collection('Event'), q.Var('d'))
			)
		)
	)
}

exports.handler = async () => {
	await fetch(url)
		.then(res => res.json())
		.then(res => {
			const { events } = res
			const newData = []
			events.filter(event => {
				const data = {
					lastUpdate: Date.now().toString(),
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
		.catch(error => (console.log(error)))
}
