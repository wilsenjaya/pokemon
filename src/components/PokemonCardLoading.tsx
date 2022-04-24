/* eslint-disable react/require-default-props */
import {
  Box,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';

type Props = {
  withoutCircle?: boolean;
};

const PokemonCardLoading = ({ withoutCircle }: Props) => (
  <Box
    p={4}
    boxShadow="xl"
    textAlign="center"
    borderWidth="1px"
    borderRadius="2xl"
  >
    {!withoutCircle && <SkeletonCircle size="130px" m="auto" />}
    <Skeleton height={5} maxWidth={200} mx="auto" mt={4} />
    <Skeleton height={5} maxWidth={200} mx="auto" mt={4} />
    <Skeleton height={5} maxWidth={200} mx="auto" mt={4} />
  </Box>
);

export default PokemonCardLoading;
