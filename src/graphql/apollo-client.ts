import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_POKEMON_GRAPHQL_ADDRESS,
  cache: new InMemoryCache(),
});

export default client;
