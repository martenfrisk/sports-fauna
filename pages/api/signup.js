import { auth, db } from '@/utils/firebase';

// eslint-disable-next-line consistent-return
const handler = async (req, res) => {
  const {
    email, username, favTeam, password,
  } = await req.body;

  // const admin = false

  if (!email || !password) {
    return res.status(400).send('Email and password not provided');
  }
  try {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (User) => {
        db.ref(`users/${User.user.uid}`).set({
          email,
          username,
          favTeam,
          verified: false,
        });
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          return res.status(404).send('Please provide a stronger password.');
        }
        return res.status(404).json(error);
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
  return res.status(200).json({ success: true });
};

export default handler;
