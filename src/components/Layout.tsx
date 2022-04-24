import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Button,
} from '@chakra-ui/react';

import pokemonLogo from '../../public/assets/pokemonLogo.png';

type Props = {
  children: React.ReactNode
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const onClickMyPokemon = () => router.push('/my-pokemon');

  return (
    <>
      <Box
        py={3}
        px={5}
        mb={6}
        textAlign="center"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/">
          <a>
            <Image src={pokemonLogo} alt="logo" width={160} height={59} />
          </a>
        </Link>
        <Button
          fontSize="sm"
          rounded="full"
          colorScheme="yellow"
          onClick={onClickMyPokemon}
        >
          My Pokemon
        </Button>
      </Box>
      {children}
    </>
  );
}
