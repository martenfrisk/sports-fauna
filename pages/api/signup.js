import { query as q } from 'faunadb'
import { guestClient } from '@/utils/fauna-client'
import { setAuthCookie } from '@/utils/auth-cookies'

export default async function signup(req, res) {
	const { email, username, favTeam, password } = req.body
	const admin = false
	if (!email || !password) {
		return res.status(400).send('Email and password not provided')
	}

	try {
		const existingEmail = await guestClient.query(
			q.Exists(q.Match(q.Index('unique_User_email'), q.Casefold(email)))
		)

		if (existingEmail) {
			return res.status(400).send(`Email ${email} already exists`)
		}

		const user = await guestClient.query(
			q.Create(q.Collection('User'), {
				credentials: { password },
				data: { email, username, favTeam, admin },
			})
		)

		if (!user.ref) {
			return res.status(404).send('User ref is missing')
		}

		const auth = await guestClient.query(
			q.Login(user.ref, {
				password,
			})
		)

		if (!auth.secret) {
			return res.status(404).send('Auth secret is missing')
		}
		const userRef = auth.instance.toString()
		const userID = userRef.split(',')[1].split('"')[1]

		setAuthCookie(res, auth.secret, userID)

		res.status(200).end()
	} catch (error) {
		console.error(error)
		res.status(error.requestResult.statusCode).send(error.message)
	}
}