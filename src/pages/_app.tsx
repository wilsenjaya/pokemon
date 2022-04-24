/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import '../styles/globals.css';
import client from '../apollo-client';
import { PokemonContextProvider } from '../context/PokemonContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokemon Master</title>
        <meta name="description" content="Become a Pokemon Master!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Layout>
            <PokemonContextProvider>
              <Component {...pageProps} />
            </PokemonContextProvider>
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
