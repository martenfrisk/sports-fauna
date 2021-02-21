/* eslint-disable quotes */
import { auth } from '@/utils/firebase'

export default async function reset(req, res) {
	const { email } = req.body

	auth
		.sendPasswordResetEmail(email)
		.then(() => {
			return res
				.status(200)
				.send('Password reset email sent! Check your inbox.')
		})
		.catch((error) => {
			return res.status(404).send('Something went wrong: ', error)
		})
}
