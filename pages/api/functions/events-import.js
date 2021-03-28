import fetch from 'isomorphic-unfetch'
// import { db } from '@/utils/firebase'
// import { FootballDataMatchResponse } from '@/utils/types/api-response-types'
import admin from 'firebase-admin'
// import { clientCredentials } from '@/utils/firebase'
// import adminCredentials from 'sportguess-d27fd-firebase-adminsdk-mw72c-6c36c6c610.json'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY) : undefined,
			projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
		}),
		databaseURL: 'https://sportguess-d27fd-default-rtdb.firebaseio.com',
	})
}

const handler = async (req, res) => {
	const { league } = await req.body

	const addDays = (days) => {
		const result = new Date()
		result.setDate(result.getDate() + days)
		return result
	}
	const removeDays = (days) => {
		const result = new Date()
		result.setDate(result.getDate() - days)
		return result
	}

	const toCorrectDateFormat = (date) =>
		date.toLocaleDateString('sv-SE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})

	const today = new Date()
	const thirtyDaysFromNow = toCorrectDateFormat(addDays(30))
	const thirtyDaysAgo = toCorrectDateFormat(removeDays(30))

	const ref = admin.database().ref(`teams/${league}`)
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
					const data = await response.json()
					if (data && data.matches) {
						data.matches.forEach((eventItem) => {
							resultData.push(eventItem)
							admin.database().ref(`teams/${league}/${team.id}/events/${eventItem.id}`).set(
								eventItem
							)
						})
					} 
					// else {
					// 	return res.status(500).send('Failed to fetch from external API')
					// }
				})
				admin.database().ref('teams/updateHistory').update({ lastUpdate: today })
			})

		return res.status(200).send('Events successfully imported/updated.')
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default handler
