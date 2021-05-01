/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import Link from 'next/link';
import Layout from '@/components/layout';
import { db } from '@/utils/firebase';
import EditUser from '@/components/edit-user';
import { getLeagues } from '@/utils/firebase-requests';
import { useState } from 'react';
import {
  withAuthUser,
  useAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { User } from '@/utils/types/types';
import { snapshotToArray } from '@/utils/extra-functions';

const Profile = ({ userData, leagues }: { userData: any; leagues: any }) => {
  const [msg, setMsg] = useState('');
  const userLeagues = userData?.leagues ? Object.keys(userData.leagues) : null;
  const AuthUser = useAuthUser();
  const sendVerificationEmail = async () => {
    await fetch('/api/email-verification', {
      method: 'POST',
    })
      .then((res) => res.text())
      .then((data) => setMsg(data));
  };
  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col mt-4">
            {/* <pre className="w-64">{JSON.stringify(AuthUser, null, 2)}</pre> */}
            <h1 className="mb-4 text-2xl">
              {userData.admin ? 'Admin' : 'User'}
              {' '}
              profile
            </h1>

            {userData.admin && (
              <div className="w-full">
                <Link href="/admin">Go to admin dashboard</Link>
              </div>
            )}

            <EditUser defaultValues={userData} id={AuthUser.id} />

            <div className="flex justify-center w-full my-8">
              {msg === '' ? (
                AuthUser.emailVerified ? (
                  <p>Your account is verified.</p>
                ) : (
                  <p>
                    Your account is not verified. Click
                    {' '}
                    <button type="submit" onClick={sendVerificationEmail}>
                      here
                    </button>
                    {' '}
                    to send a verification link to your email.
                  </p>
                )
              ) : (
                <p>{msg}</p>
              )}
            </div>

            {leagues !== null && userLeagues && (
              <div>
                <div className="flex flex-col items-center my-4">
                  <div className="my-4 text-xl font-light text-blue-700">
                    Your leagues
                  </div>
                  {snapshotToArray(leagues).map(
                    (league: any) => userLeagues.includes(league.name) && (
                    <div
                      className="flex flex-wrap justify-between px-6 py-4 mb-4 bg-white rounded-md w-72 shadow-blue-lg"
                      key={league._id}
                    >
                      <div>
                        <Link href={`/league/${league.slug}`}>
                          <a className="text-lg font-light text-blue-800 border-b-2 border-white border-dashed hover:border-blue-400">
                            {league.name}
                          </a>
                        </Link>
                      </div>
                      <div className="flex flex-col w-full p-2 ">
                        {league.members ? (
                          <>
                            {snapshotToArray(league.members).map(
                              (member: User) => (
                                <span
                                  className="text-base font-light"
                                  key={member.username}
                                >
                                  {member.username}
                                </span>
                              ),
                            )}
                          </>
                        ) : (
                          <p className="text-sm">No members</p>
                        )}
                      </div>
                    </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const userData = await db
    .ref(`users/${AuthUser.id}`)
    .get()
    .then((data) => data.toJSON());
  const leagues = await getLeagues();
  return {
    props: {
      leagues: leagues || null,
      userData: userData || null,
    },
  };
});

// @ts-ignore
export default withAuthUser()(Profile);
