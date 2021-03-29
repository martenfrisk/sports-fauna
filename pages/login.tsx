import Layout from '@/components/layout';
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import FirebaseAuth from '@/components/FirebaseAuth';

const Login = () => (
  <Layout>
    <div className="w-full max-w-6xl px-6 mx-auto">
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center max-w-2xl">
          <h1 className="mb-6 text-xl">Log in</h1>
          <FirebaseAuth />
        </div>
      </div>
    </div>
  </Layout>
);

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Login);
