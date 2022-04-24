import { gql } from '@apollo/client';

const PokemonListQuery = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      nextOffset
      results {
        id
        name
        artwork
      }
    }
  }
`;

export default PokemonListQuery;
