import { setAuthCookie } from '@/utils/auth-cookies'
// import { UserContext } from '@/utils/user-context'
// import { useContext } from 'react'
// import { setAuthCookies } from 'next-firebase-auth'
// import initAuth from '@/utils/initAuth'
// initAuth()

import { auth, db } from '@/utils/firebase'

const login = async (req, res) => {
	const { email, password } = await req.body
	auth.signInWithEmailAndPassword(email, password)
		.then(async (User) => {
			const id = await User.user.getIdToken()

			if (id) {
				const userData = await db.ref(`users/${User.user.uid}`).once('value').then((data) => data.child('username').val())

				setAuthCookie(res, id, User.user.uid, userData)
			}
		})
		.then(() => res.status(200).end())
		.catch((error) => {
			const { code, message } = error
			switch (code) {
			case 'auth/wrong-password':
				return res.status(500).send('Wrong password.')
			case 'auth/user-not-found':		
				return res.status(500).send('This user is not registered.')
			default:
				return res.status(500).send(message)
			}
		})

}

export default login