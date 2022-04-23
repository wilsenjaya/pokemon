import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { Stack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

import PokemonListQuery from '../../graphql/PokemonList.graphql';

type Pokemon = {
  id: number;
  url: string;
  name: string;
  artwork: string;
};

const PokemonList: NextPage = () => {
  const { data, error, loading } = useQuery(PokemonListQuery, {
    variables: { limit: 10, offset: 0 },
  });

  if (loading) {
    return (
      <Stack>
        <SkeletonCircle size="10" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  if (error) return <p>{error.message}</p>;

  const { results: pokemonList } = data.pokemons;

  return (
    <>
      {pokemonList.map((pokemon: Pokemon) => (
        <div key={pokemon.id}>
          <Link href={`/pokemon/${pokemon.id}`}>
            <a>
              <h3>{pokemon.name}</h3>
              <Image
                src={pokemon.artwork}
                alt="image"
                width={150}
                height={150}
              />
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PokemonList;
