// /* eslint-disable @typescript-eslint/no-var-requires */
// var admin = require('firebase-admin')

// admin.initializeApp({
// 	credential: admin.credential.cert({
// 		clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
// 		privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
// 		projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
		
// 	}),
// 	databaseURL: 'https://sportguess-d27fd-default-rtdb.firebaseio.com',
// })

// admin
// 	.auth()
// 	.getUserByEmail('frisk@hey.com')
// 	.then((user) => {
// 		return admin.auth().setCustomUserClaims(user.uid, {
// 			admin: true,
// 		})
// 	})
// 	.catch((error) => console.log(error))
