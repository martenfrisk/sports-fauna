import { getAuthCookie } from '@/utils/auth-cookies'
import { getUserDetails, sendVerificationEmail } from '@/utils/serverside-requests'
export default async function handler(req, res) {
	// const { email } = await req.body
	const token = getAuthCookie(req)

	const data = await getUserDetails(token)

	const response = await sendVerificationEmail(data.email)
	console.log(response)
	if (response) return res.status(200).send('Verfication email sent')
	return res.status(404).send(JSON.stringify(response))
}
