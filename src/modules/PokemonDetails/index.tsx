/* eslint-disable react/no-array-index-key */
import { useContext } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import ModalSuccessCatch from './components/ModalSuccessCatch';
import PokemonCardLoading from '../../components/PokemonCardLoading';
import PokemonDetailData from './components/PokemonDetailData';
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

const renderLoading = () => (
  <SimpleGrid columns={[1, 1, 2]} spacing={5}>
    <PokemonCardLoading />
    <PokemonCardLoading withoutCircle />
  </SimpleGrid>
);

const PokemonList: NextPage<Props> = ({ id }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();
  const { addPokemon } = useContext(PokemonContext)!;
  const { data, error, loading } = useQuery(PokemonDetailQuery, { variables: { name: id } });

  if (loading) return renderLoading();
  if (error) return <Text>{error.message}</Text>;

  const { pokemon }: Pokemon = data;

  const onCatch = () => {
    if (Math.random() > 0.5) onOpen();
    else {
      toast({
        title: 'Failed To Catch!',
        description: 'Uh Oh! You have failed to catch the pokemon',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
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
    <Box py={3} px={5}>
      <SimpleGrid columns={[1, 1, 2]} spacing={5}>
        <Box
          p={4}
          boxShadow="xl"
          textAlign="center"
          borderWidth="1px"
          borderRadius="2xl"
          height="fit-content"
        >
          <Text fontWeight={600} color="gray.500">
            {`# ${pokemon.id}`}
          </Text>
          <Image src={pokemon.sprites.front_default} width={250} height={250} />
          <Heading fontSize="2xl" fontFamily="body">
            {pokemon.name}
          </Heading>

          <Stack align="center" justify="center" direction="row" mt={3}>
            {pokemon.types?.map((item, index) => (
              <Badge
                key={index}
                px={2}
                py={1}
                fontWeight="400"
              >
                {item.type.name}
              </Badge>
            ))}
          </Stack>

          <Button
            colorScheme="red"
            margin={3}
            onClick={onCatch}
            mt={6}
          >
            Catch Pokemon
          </Button>
        </Box>
        <PokemonDetailData abilities={pokemon.abilities} moves={pokemon.moves} />
      </SimpleGrid>
      <ModalSuccessCatch
        isOpen={isOpen}
        onClose={onClose}
        pokemonId={pokemon.id.toString()}
        onSubmit={onSubmitData}
      />
    </Box>
  );
};

export default PokemonList;
