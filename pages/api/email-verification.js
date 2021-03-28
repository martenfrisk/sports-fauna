// import { getAuthCookie } from '@/utils/auth-cookies'
import { sendVerificationEmail } from 'pages/api/functions/serverside-requests'
export default async function handler(req, res) {
	const { email } = await req.body
	// const token = getAuthCookie(req)

	// const data = await getUserDetails(token)

	const response = await sendVerificationEmail(email)
	console.log(response)
	if (response) return res.status(200).send('Verfication email sent')
	return res.status(404).send(JSON.stringify(response))
}
