import { db } from '@/utils/firebase'

const handler = async (req, res) => {
	const { slug } = req.body
	const ref = db.ref(`leagues/${slug}`)
	ref.once('value')
		.then(snapshot => {
			if(snapshot.exists()) {
				return res.status(409).send('This league name is already taken. Please choose another one.')
			} else {
				ref.set(req.body)
			}
		})
		.then(() => res.status(200).end())
		.catch((error) => res.status(500).json({ error: error }))
}

export default handler