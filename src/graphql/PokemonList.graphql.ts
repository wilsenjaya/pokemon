import { gql } from '@apollo/client';

const PokemonListQuery = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      nextOffset
      prevOffset
      results {
        id
        url
        name
        image
        artwork
      }
    }
  }
`;

export default PokemonListQuery;
