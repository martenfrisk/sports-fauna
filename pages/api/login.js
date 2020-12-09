import { query as q } from 'faunadb'
import { guestClient } from '@/utils/fauna-client'
import { setAuthCookie } from '@/utils/auth-cookies'

export default async function login(req, res) {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).send('Email and password not provided')
	}

	try {
		const auth = await guestClient.query(
			q.Login(q.Match(q.Index('unique_User_email'), q.Casefold(email)), {
				password,
			})
		)

		if (!auth.secret) {
			return res.status(404).send('Auth secret is missing')
		}
		const userRef = auth.instance.toString()
		const user = userRef.split(',')[1].split('"')[1]
		setAuthCookie(res, auth.secret, user)

		res.status(200).end()
	} catch (error) {
		console.error(error)
		res.status(error.requestResult.statusCode).send(error.message)
	}
}