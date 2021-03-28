// import firebase from 'firebase/app'
// import { FirebaseAuth } from '@/components/FirebaseAuth'
// import 'firebase/auth'
import admin from 'firebase-admin'
// import { auth } from '@/utils/firebase'
// import adminCredentials from 'sportguess-d27fd-firebase-adminsdk-mw72c-6c36c6c610.json'

if (typeof window == 'undefined' && !admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
			projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
		}),
		databaseURL: 'https://sportguess-d27fd-default-rtdb.firebaseio.com',
	})
}
// export const getUserDetails = async (token: string) => {
// 	const verify = () => auth.verifyIdToken(token)
// 	const decoded = await verify()
// 	if (decoded) return decoded
// }

export const sendVerificationEmail = async (email: string) => {
	console.log(email)
	const verificationEmail = () =>
	admin.auth().generateEmailVerificationLink(email)
	const result = await verificationEmail()
	console.log(result)
	if (result) return result
}
