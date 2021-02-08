import { query as q } from 'faunadb'
import { authClient } from '@/utils/fauna-client'
import { getAuthCookie } from '@/utils/auth-cookies'

export default async function user(req, res) {
	const token = getAuthCookie(req)

	if (!token) {
		return res.status(200).send('Not logged in')
	}

	try {
		const { ref, data } = await authClient(token).query(
			q.Paginate(
				q.Match(
					q.Index('league_members_by_league'))),
		)
		res.status(200).json(data)
	} catch (error) {
		console.error(error)
		res.status(error.requestResult.statusCode).send(error.message)
	}
}
