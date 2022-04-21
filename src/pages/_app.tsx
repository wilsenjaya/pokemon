/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
