import { gql } from '@apollo/client';

const PokemonDetailQuery = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      sprites {
        front_default
        back_default
      }
    }
  }
`;

export default PokemonDetailQuery;
