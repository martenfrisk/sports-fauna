import faunadb from 'faunadb'
import fetch from 'isomorphic-unfetch'

/* 
https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/
https://community.netlify.com/t/scheduling-builds-and-deploys-with-netlify/2563/10
https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/
*/

const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.NEXT_FAUNA_ADMIN_SECRET
})

const url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328'

exports.handler = async () => {
	await fetch(url)
		.then(res => res.json())
		.then(res => {
			res.events.forEach(event => {
				console.log(event)
				return client.query(q.Create(q.Collection('Event'), { 
					data: {
						homeTeamName: event.strHomeTeam,
						awayTeamName: event.strAwayTeam,
						homeTeamId: event.idHomeTeam,
						awayTeamId: event.idAwayTeam,
						dateTime: event.strTimestamp,
						venue: event.strVenue,
						divisionName: event.strLeague,
						divisionId: event.idLeague,
					}
				}))
					.then(res => console.log(res))
					.catch(err => console.error('Error: %s', err))
			})
		})
		.catch(error => (console.log(error)))
}
