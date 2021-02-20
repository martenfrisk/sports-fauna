import { getAuthCookie, removeAuthCookie } from '@/utils/auth-cookies'
import { db } from '@/utils/firebase'
import { getUserDetails } from '@/utils/serverside-requests'

export default async function user(req, res) {
	const token = getAuthCookie(req)

	if (!token) {
		removeAuthCookie(res)
		return res.status(200).send('Not logged in')
	}

	try {
		const data = await getUserDetails(token)
		let username 
		if (data) {
			username = await db.ref(`users/${data.uid}`).once('value').then((data) => data.child('username').val())
		}

		// console.log(data)
		res.status(200).json({ id: data.user_id, username})
	} catch (error) {
		console.error(error)
		removeAuthCookie(res)
		res.status(404).send(error)
	}
}