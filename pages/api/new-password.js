import { query as q } from 'faunadb'
import { authClient } from '@/utils/fauna-client'

export default async function login(req, res) {
	const { reset, user , password } = req.body

	if (!user || !password) {
		return res.status(400).send('User and password not provided')
	}
	const SECRET = process.env.NEXT_FAUNA_ADMIN_SECRET

	try {
		await authClient(SECRET).query(
			q.Update(q.Ref(q.Collection('User'), user), {
				credentials: { password }
			})
		).then(() => authClient(SECRET).query(
			q.Delete(q.Ref(q.Collection('ResetRequest'), reset))
		))

		res.status(200).end()
	} catch (error) {
		console.error(error)
		res.status(error.requestResult.statusCode).send(error.message)
	}
}