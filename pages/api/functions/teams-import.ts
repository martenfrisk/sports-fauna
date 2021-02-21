import { Response } from '@/utils/types/api-teams-types'
import { db } from '@/utils/firebase'
import fetch from 'isomorphic-unfetch'

const handler = async (req, res) => {
	const { league } = req.body 
	const data = await fetch(
		`https://api.football-data.org/v2/competitions/${league}/teams`,
		{
			headers: {
				'X-Auth-Token': process.env.FOOTBALLDATA_API,
			},
		}
	)
	const fetchResponse: Response = await data.json()
	if (fetchResponse) {
		fetchResponse.teams.forEach((team) => {
			db.ref(`teams/${league}/${team.id}`).set({ ...team })
		})

	}

	return res.status(200).send('ok')
}

export default handler
