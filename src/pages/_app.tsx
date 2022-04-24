/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import '../styles/globals.css';
import client from '../apollo-client';
import { PokemonContextProvider } from '../context/PokemonContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Pokemon</title>
        <meta name="description" content="Pokemon data you can trust!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <PokemonContextProvider>
            <Component {...pageProps} />
          </PokemonContextProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
