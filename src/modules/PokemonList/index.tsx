/* eslint-disable react/no-array-index-key */
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import get from 'lodash/get';

import PokemonContext from '../../context/PokemonContext';
import PokemonListQuery from '../../graphql/PokemonList.graphql';
import constants from '../../constants';
import PokemonCard from '../../components/PokemonCard';
import PokemonCardLoading from '../../components/PokemonCardLoading';

const { POKEMON_LIST_FETCH_LIMIT: LIMIT } = constants;

type Pokemon = {
  id: number;
  name: string;
  artwork: string;
};

const totalShimmering = new Array(8).fill(0);

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

  if (error) return <Text>{error.message}</Text>;

  return (
    <Box p={[5, 5, 10]}>
      <SimpleGrid columns={[1, 1, 2, 4]} spacing={5}>
        {loading || !data
          ? totalShimmering.map((arr, index) => <PokemonCardLoading key={index} />)
          : pokemonList.map((pokemon: Pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={`${pokemon.id}`}
              name={pokemon.name}
              image={pokemon.artwork}
              totalOwned={getTotalPokemonOwned(pokemon.id)}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default PokemonList;
