import { init } from 'next-firebase-auth'

const initAuth = () => {
	init({
		authPageURL: '/login',
		appPageURL: '/',
		loginAPIEndpoint: '/api/login', // required
		logoutAPIEndpoint: '/api/logout', // required
		firebaseAdminInitConfig: {
			credential: {
				projectId: 'sportguess-d27fd',
				clientEmail: 'firebase-adminsdk-mw72c@sportguess-d27fd.iam.gserviceaccount.com',
				// The private key must not be accesssible on the client side.
				privateKey: process.env.FIREBASE_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : undefined,
			},
			databaseURL: 'https://my-example-app.firebaseio.com',
		},
		firebaseClientInitConfig: {
			apiKey: 'AIzaSyAnOtxkfexiUmDW-seBFMUG9AIMrNmu6Q0', // required
			authDomain: 'sportguess-d27fd.firebaseapp.com',
			databaseURL: 'https://sportguess-d27fd-default-rtdb.firebaseio.com/',
			projectId: 'sportguess-d27fd',
		},
		cookies: {
			name: 'SportGuess', // required
			// Keys are required unless you set `signed` to `false`.
			// The keys cannot be accessible on the client side.
			keys: [
				process.env.COOKIE_SECRET_CURRENT,
				process.env.COOKIE_SECRET_PREVIOUS,
			],
			httpOnly: true,
			maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
			overwrite: true,
			path: '/',
			sameSite: 'strict',
			secure: false, // set this to false in local (non-HTTPS) development
			signed: false,
		}
	})
}

export default initAuth