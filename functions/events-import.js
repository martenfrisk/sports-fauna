import faunadb from 'faunadb'
import fetch from 'node-fetch'

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

exports.handler = (event, context) => {
	const data = fetch(url)
		.then(res => res.json())
		.catch(error => ({ statusCode: 422, body: String(error)}))
	data.events.map(event => (
		client.query(q.Create(q.Collection('Events'), { 
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
	))
}
