import admin from 'firebase-admin'
// import { clientCredentials } from '@/utils/firebase'
// import adminCredentials from 'sportguess-d27fd-firebase-adminsdk-mw72c-6c36c6c610.json'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.applicationDefault(),
	})
}
export const getUserDetails = async (token: string) => {
	const verify = () => admin.auth().verifyIdToken(token)
	const decoded = await verify()
	if (decoded) return decoded
}

export const sendVerificationEmail = async (email: string) => {
	console.log(email)
	const verificationEmail = () =>
		admin.auth().generateEmailVerificationLink(email)
	const result = await verificationEmail()
	console.log(result)
	if (result) return result
}
