import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Stack, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import get from 'lodash/get';

import PokemonContext from '../../context/PokemonContext';
import PokemonListQuery from '../../graphql/PokemonList.graphql';
import constants from '../../constants';

const { POKEMON_LIST_FETCH_LIMIT: LIMIT } = constants;

type Pokemon = {
  id: number;
  url: string;
  name: string;
  artwork: string;
};

const renderLoading = () => (
  <Stack>
    <SkeletonCircle size="10" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
  </Stack>
);

const PokemonList: NextPage = () => {
  const { getTotalPokemonOwned } = useContext(PokemonContext)!;
  const {
    data, error, loading, fetchMore,
  } = useQuery(PokemonListQuery, {
    variables: { limit: LIMIT, offset: 0 },
  });
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [offset, setOffset] = useState<number>(0);
  const [shouoldFetch, setShouldFetch] = useState<boolean>(false);

  const handleScroll = () => {
    const { scrollHeight } = document.body;
    const maxHeight = window.innerHeight + document.documentElement.scrollTop + 1;

    if (maxHeight >= scrollHeight) {
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addMoreData = () => {
    if (offset > 0) {
      fetchMore({
        variables: { limit: LIMIT, offset },
      }).then((fetchMoreResult) => {
        const newPokemons = get(fetchMoreResult, 'data.pokemons.results', []);
        const newOffset = get(fetchMoreResult, 'data.pokemons.nextOffset', 0);
        setPokemonList([...pokemonList, ...newPokemons]);
        setOffset(newOffset);
      });
    }
  };

  useEffect(() => {
    if (data) {
      const newPokemons = get(data, 'pokemons.results', []);
      const newOffset = get(data, 'pokemons.nextOffset', 0);

      setPokemonList([...pokemonList, ...newPokemons]);
      setOffset(newOffset);
    }
  }, [data]);

  useEffect(() => {
    if (shouoldFetch) {
      addMoreData();
      setShouldFetch(false);
    }
  }, [shouoldFetch]);

  if (loading || !data) return renderLoading();
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {pokemonList.map((pokemon: Pokemon) => (
        <div key={pokemon.id}>
          <Link href={`/pokemon/${pokemon.id}`}>
            <a>
              <h3>{pokemon.name}</h3>
              <p>
                Number Owned:
                {getTotalPokemonOwned(pokemon.id)}
              </p>
              <Image
                src={pokemon.artwork}
                alt={`${pokemon.name}_image`}
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
