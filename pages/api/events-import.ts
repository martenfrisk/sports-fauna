import { db } from '@/utils/firebase'
import { FootballDataMatchResponse } from '@/utils/types/api-response-types'
import fetch from 'isomorphic-unfetch'

const handler = async (req, res) => {
	const { league } = req.body
	const addDays = (days: number) => {
		const result = new Date()
		result.setDate(result.getDate() + days)
		return result
	}
	const toCorrectDateFormat = (date: Date) =>
		date.toLocaleDateString('sv-SE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})

	const today = toCorrectDateFormat(new Date())
	const thirtyDaysFromNow = toCorrectDateFormat(addDays(30))

	const ref = db.ref(`teams/${league}`)
	const teams = []
	ref
		.once('value', (snapshot) => {
			snapshot.forEach((snap) => {
				teams.push({ ...snap.val() })
			})
		})

		.then(() => {
			teams.forEach(async (team) => {
				const res = await fetch(
					`http://api.football-data.org/v2/teams/${team.id}/matches?dateFrom=${today}&dateTo=${thirtyDaysFromNow}`,
					{
						headers: {
							'X-Auth-Token': process.env.FOOTBALLDATA_API,
						},
					}
				)
				const data: FootballDataMatchResponse = await res.json()
				if (data) {
					data.matches.forEach((eventItem) => {
						db.ref(`teams/${league}/${team.id}/events/${eventItem.id}`).set(eventItem)
					})
				}
			})
		})
		// .catch(error => console.error(error))
		.then(() => res.status(200).send('ok'))
		.catch((error) => res.status(500).json({ error: error }))
}

export default handler
