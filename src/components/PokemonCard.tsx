/* eslint-disable react/require-default-props */
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Heading,
  Box,
  Text,
  Stack,
  Button,
  Badge,
} from '@chakra-ui/react';

type Props = {
  id: string;
  name: string;
  image: string;
  nickName?: string;
  totalOwned?: number;
  onRemove?: () => void;
};

const PokemonCard = ({
  id,
  name,
  image,
  nickName,
  totalOwned,
  onRemove,
}: Props) => {
  const router = useRouter();

  const onClickDetail = () => router.push(`/pokemon/${id}`);

  return (
    <Box
      p={4}
      boxShadow="xl"
      textAlign="center"
      borderWidth="1px"
      borderRadius="2xl"
      minHeight={300}
    >
      <Image src={image} alt={`${name}_image`} width={150} height={150} />
      <Heading fontSize="2xl" fontFamily="body">
        {name}
      </Heading>
      <Text fontWeight={600} color="gray.500" mb={4}>
        {`# ${id}`}
      </Text>

      {!!nickName && (
        <Heading fontSize="2xl" fontFamily="body">
          {nickName}
        </Heading>
      )}

      <Stack align="center" justify="center" direction="row" mt={4} spacing={3}>
        <Button fontSize="sm" rounded="full" onClick={onClickDetail}>
          Check Detail
        </Button>

        {onRemove && (
          <Button
            fontSize="sm"
            rounded="full"
            colorScheme="red"
            onClick={onRemove}
          >
            Release
          </Button>
        )}
      </Stack>

      {!!totalOwned && (
        <Badge
          mt={4}
          px={2}
          py={1}
          variant="outline"
          fontWeight="400"
          colorScheme={totalOwned > 0 ? 'green' : 'gray'}
        >
          {`Total Owned: ${totalOwned}`}
        </Badge>
      )}
    </Box>
  );
};

export default PokemonCard;
