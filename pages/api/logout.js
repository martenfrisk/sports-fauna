import initAuth from 'initAuth'
import { unsetAuthCookies } from 'next-firebase-auth'
// import { removeAuthCookie } from '@/utils/auth-cookies'

initAuth()

const handler = async (req, res) => {
	try {
		await unsetAuthCookies(req, res)
	} catch (e) {
		return res.status(500).json({ error: 'Unexpected error.' })
	}
	return res.status(200).json({ success: true })
}

export default handler