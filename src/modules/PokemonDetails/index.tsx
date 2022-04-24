/* eslint-disable react/no-array-index-key */
import { useContext } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { Button, useDisclosure } from '@chakra-ui/react';

import ModalSuccessCatch from './components/ModalSuccessCatch';
import ModalFailedCatch from './components/ModalFailedCatch';
import PokemonDetailQuery from '../../graphql/PokemonDetail.graphql';
import PokemonContext from '../../context/PokemonContext';

type PokemonData = {
  id: number;
  name: string;
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
  sprites: {
    front_default: string
    back_default: string
  }
};

type Pokemon = {
  pokemon: PokemonData;
};

type Props = {
  id: string;
};

const PokemonList: NextPage<Props> = ({ id }: Props) => {
  const modalSuccess = useDisclosure();
  const modalFailed = useDisclosure();
  const { addPokemon } = useContext(PokemonContext)!;
  const { data, error, loading } = useQuery(PokemonDetailQuery, { variables: { name: id } });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { pokemon }: Pokemon = data;

  const onCatch = () => {
    if (Math.random() > 0.5) modalSuccess.onOpen();
    else modalFailed.onOpen();
  };

  const onSubmitData = (nickName: string) => {
    const savedData = {
      id: pokemon.id.toString(),
      nickName,
      pokemonName: pokemon.name,
      pokemonImage: pokemon.sprites.front_default,
    };

    addPokemon(pokemon.id.toString(), savedData);
  };

  return (
    <>
      <Button
        colorScheme="red"
        margin={3}
        onClick={onCatch}
      >
        Catch Pokemon
      </Button>
      <h1>{pokemon.id}</h1>
      <h1>{pokemon.name}</h1>
      <Image src={pokemon.sprites.back_default} width={130} height={130} />
      <Image src={pokemon.sprites.front_default} width={130} height={130} />
      {pokemon.types?.map((item, index) => (
        <div key={index}>
          <h3>{item.type.name}</h3>
        </div>
      ))}
      {pokemon.abilities?.map((item, index) => (
        <div key={index}>
          <h3>{item.ability.name}</h3>
        </div>
      ))}
      {pokemon.moves?.map((item, index) => (
        <div key={index}>
          <h3>{item.move.name}</h3>
        </div>
      ))}
      <ModalSuccessCatch
        isOpen={modalSuccess.isOpen}
        onClose={modalSuccess.onClose}
        pokemonId={pokemon.id.toString()}
        onSubmit={onSubmitData}
      />
      <ModalFailedCatch isOpen={modalFailed.isOpen} onClose={modalFailed.onClose} />
    </>
  );
};

export default PokemonList;
