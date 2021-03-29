/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
// import { UserContextProvider } from '@/utils/user-context'
import '../styles/globals.css';
import initAuth from 'initAuth';

initAuth();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <UserContextProvider>
    <Component {...pageProps} />
    // </UserContextProvider>
  );
}

export default MyApp;
