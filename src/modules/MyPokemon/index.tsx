import { useContext } from 'react';
import type { NextPage } from 'next';
import isEmpty from 'lodash/isEmpty';
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

import PokemonCard from '../../components/PokemonCard';
import PokemonContext from '../../context/PokemonContext';

const PokemonList: NextPage = () => {
  const { myPokemon, releasePokemon } = useContext(PokemonContext)!;

  const onRemove = (id: string, nickName: string) => () => releasePokemon(id, nickName);

  return (
    <>
      <Heading textAlign="center">My Pokemon List</Heading>
      {isEmpty(myPokemon) ? (
        <Text textAlign="center" color="gray.500" mt={20}>Ooops... No Pokemon Caught</Text>
      ) : (
        <Box p={[5, 5, 10]}>
          <SimpleGrid columns={[1, 1, 2, 4]} spacing={5}>
            {Object.values(myPokemon)
              .flat()
              .map((data) => (
                <PokemonCard
                  key={`${data.id}-${data.nickName}`}
                  id={data.id}
                  name={data.pokemonName}
                  image={data.pokemonImage}
                  nickName={data.nickName}
                  onRemove={onRemove(data.id, data.nickName)}
                />
              ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default PokemonList;
