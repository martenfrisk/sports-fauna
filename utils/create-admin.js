/* eslint-disable @typescript-eslint/no-var-requires */
var admin = require('firebase-admin')

var serviceAccount = require('../sportguess-d27fd-firebase-adminsdk-mw72c-6c36c6c610.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://sportguess-d27fd-default-rtdb.firebaseio.com',
})

admin
	.auth()
	.getUserByEmail('frisk@hey.com')
	.then((user) => {
		return admin.auth().setCustomUserClaims(user.uid, {
			admin: true,
		})
	})
	.catch((error) => console.log(error))
