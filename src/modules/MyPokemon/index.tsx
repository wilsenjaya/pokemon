import { useContext } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import isEmpty from 'lodash/isEmpty';
import { Button } from '@chakra-ui/react';

import PokemonContext from '../../context/PokemonContext';

const PokemonList: NextPage = () => {
  const { myPokemon, releasePokemon } = useContext(PokemonContext)!;

  if (isEmpty(myPokemon)) return <h1>Empty</h1>;

  return (
    <div>
      <h1>My Pokemon</h1>
      {Object.values(myPokemon)
        .flat()
        .map((data) => (
          <div key={`${data.id}-${data.nickName}`}>
            <h1>{data.pokemonName}</h1>
            <p>{data.id}</p>
            <p>{data.nickName}</p>
            <Image src={data.pokemonImage} width={130} height={130} />
            <Button
              colorScheme="red"
              margin={3}
              onClick={() => releasePokemon(data.id, data.nickName)}
            >
              Remove Pokemon
            </Button>
          </div>
        ))}
    </div>
  );
};

export default PokemonList;
