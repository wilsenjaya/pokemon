import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter, NextRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';
import {
  Box,
  Text,
  Heading,
  Button,
  Center,
} from '@chakra-ui/react';

import pokeBall from '../../../public/assets/pokeball.png';

export const handleClick = (router: NextRouter) => () => router.push('/');

const renderBig4Text = () => (
  <Heading fontSize={['6rem', '11rem']} color="#cdcdcd" marginX="1rem">
    4
  </Heading>
);

const Custom404: NextPage = () => {
  const router = useRouter();

  return (
    <Center minH="100vh">
      <Box
        maxW="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        margin={4}
      >
        <Box p={5}>
          <Box display="flex" alignItems="center">
            {renderBig4Text()}
            <Image src={pokeBall} alt="0" width={130} height={130} />
            {renderBig4Text()}
          </Box>
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading fontSize="2xl" color="black" marginTop={2}>
              Page Not Found
            </Heading>
            <Text fontSize="l" color="grey" marginTop={2}>
              You look lost on your journey!
            </Text>
            <Button
              colorScheme="red"
              leftIcon={<BsArrowLeft />}
              marginTop={3}
              onClick={handleClick(router)}
            >
              Go Back Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default Custom404;
