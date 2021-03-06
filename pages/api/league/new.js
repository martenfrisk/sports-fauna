// eslint-disable-next-line import/no-extraneous-dependencies
import admin from 'firebase-admin';
// import { db } from '@/utils/firebase';
// import { clientCredentials } from '@/utils/firebase'
// import adminCredentials from 'sportguess-d27fd-firebase-adminsdk-mw72c-6c36c6c610.json'

if (typeof window === 'undefined' && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
        ? JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY)
        : undefined,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: 'https://sportguess-d27fd-default-rtdb.firebaseio.com',
  });
}

const handler = async (req, res) => {
  const { slug } = req.body;
  const ref = admin.database().ref(`leagues/${slug}`);
  ref
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        return res
          .status(409)
          .send(
            'This league name is already taken. Please choose another one.',
          );
      }
      ref.set(req.body);
      return null;
    })
    .then(() => res.status(200).end())
    .catch((error) => res.status(500).json({ error }));
};

export default handler;
