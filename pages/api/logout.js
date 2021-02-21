import { removeAuthCookie } from '@/utils/auth-cookies'

const handler = async (req, res) => {
	try {
		await removeAuthCookie(res)
	} catch (e) {
		return res.status(500).json({ error: 'Unexpected error.' })
	}
	return res.status(200).json({ success: true })
}

export default handler