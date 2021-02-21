import fetch from 'isomorphic-unfetch'
import { db } from '../../../utils/firebase'
import { FootballDataMatchResponse } from '../../../utils/types/api-response-types'

const handler = async (req, res) => {
	const { league } = await req.body

	const addDays = (days: number) => {
		const result = new Date()
		result.setDate(result.getDate() + days)
		return result
	}
	const removeDays = (days: number) => {
		const result = new Date()
		result.setDate(result.getDate() - days)
		return result
	}

	const toCorrectDateFormat = (date: Date) =>
		date.toLocaleDateString('sv-SE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})

	const today = new Date()
	const thirtyDaysFromNow = toCorrectDateFormat(addDays(30))
	const thirtyDaysAgo = toCorrectDateFormat(removeDays(30))

	const ref = db.ref(`teams/${league}`)
	const resultData = []
	const teams = []
	try {
		ref
			.once('value', (snapshot) => {
				snapshot.forEach((snap) => {
					teams.push({ ...snap.val() })
				})
			})

			.then(() => {
				teams.forEach(async (team) => {
					const response = await fetch(
						`http://api.football-data.org/v2/teams/${team.id}/matches?dateFrom=${thirtyDaysAgo}&dateTo=${thirtyDaysFromNow}`,
						{
							headers: {
								'X-Auth-Token': process.env.FOOTBALLDATA_API,
							},
						}
					)
					const data: FootballDataMatchResponse = await response.json()
					if (data && data.matches) {
						data.matches.forEach((eventItem) => {
							resultData.push(eventItem)
							db.ref(`teams/${league}/${team.id}/events/${eventItem.id}`).set(
								eventItem
							)
						})
					} 
					// else {
					// 	return res.status(500).send('Failed to fetch from external API')
					// }
				})
				db.ref('teams/updateHistory').update({ lastUpdate: today })
			})

		return res.status(200).send('Events successfully imported/updated.')
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
