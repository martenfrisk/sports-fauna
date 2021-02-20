import { setAuthCookie } from '@/utils/auth-cookies'
import { auth, db } from '@/utils/firebase'

export default async function signup(req, res) {
	const { email, username, favTeam, password } = await req.body

	// const admin = false

	if (!email || !password) {
		return res.status(400).send('Email and password not provided')
	}
	let token, userID
	try {
		auth.createUserWithEmailAndPassword(email, password)
			.then(async (User) => {
				
				token = await User.user.getIdToken()
				userID = User.user.uid
				db.ref(`users/${User.user.uid}`).set({
					email,
					username,
					favTeam,
					verified: false,
				})
				setAuthCookie(res, token, userID, username)
			}).then(() => {
				res.status(200).json({ token, userID })
			})
			.catch((error) => {
				if (error.code == 'auth/weak-password') {
					return res.status(404).send('Please provide a stronger password.')
				} else {
					// console.log(error)
					return res.status(404).json(error)
					
				}
			})
	} catch (error) {
		console.error(error)
		res.status(error.requestResult.statusCode).send(error.message)
	}
}