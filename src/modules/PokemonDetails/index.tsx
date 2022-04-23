import type { NextPage } from 'next';
// import Image from 'next/image';
import { useQuery } from '@apollo/client';

import PokemonDetailQuery from '../../graphql/PokemonDetail.graphql';

type Pokemon = {
  pokemon: {
    id: number;
    name: string;
    base_experience: number;
    abilities?: Array<{
      ability: {
        name: string;
      };
    }>;
    moves?: Array<{
      move: {
        name: string;
      };
    }>;
    types?: Array<{
      type: {
        name: string;
      };
    }>;
  };
};

type Props = {
  id: string;
};

const PokemonList: NextPage<Props> = ({ id }: Props) => {
  const { data, error, loading } = useQuery(PokemonDetailQuery, {
    variables: { name: id },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { pokemon }: Pokemon = data;

  return (
    <>
      <h1>{pokemon.id}</h1>
      <h1>{pokemon.name}</h1>
      <h1>{pokemon.base_experience}</h1>
      {pokemon.types?.map((item) => (
        <div key={pokemon.id}>
          <h3>{item.type.name}</h3>
        </div>
      ))}
      {pokemon.abilities?.map((item) => (
        <div key={pokemon.id}>
          <h3>{item.ability.name}</h3>
        </div>
      ))}
      {pokemon.moves?.map((item) => (
        <div key={pokemon.id}>
          <h3>{item.move.name}</h3>
        </div>
      ))}
    </>
  );
};

export default PokemonList;
