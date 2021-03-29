import Layout from '@/components/layout';
import { getLeaguesByUser } from '@/utils/firebase-requests';
import Link from 'next/link';

import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

const Guess = ({ data }: { data: string[] }) => (
  <Layout>
    <div className="flex flex-col items-center">
      <p className="text-lg text-center">
        Choose a league and start guessing!
      </p>
      {data
          && data.map((league: string) => (
            <div key={league} className="my-8">
              <Link href={`/guess/${league}`}>
                <a className="p-4 border border-blue-400 rounded-md shadow-md hover:bg-white bg-blue-50">
                  {league}
                </a>
              </Link>
            </div>
          ))}
    </div>
  </Layout>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const userID = await AuthUser.id;
  // console.log(userID.split('|')[0])

  const data = await getLeaguesByUser(userID);
  // console.log(data)

  return {
    props: {
      data: data || null,
    },
  };
});
export default withAuthUser()(Guess);
