import { useRouter } from 'next/router';

import PokemonDetails from '../../modules/PokemonDetails';

const Details = () => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isReady) return <PokemonDetails id={id as string} />;
  return null;
};

export default Details;
