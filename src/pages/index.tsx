import type { NextPage } from 'next';
import Link from 'next/link';

import PokemonList from '../modules/PokemonList';

const Home: NextPage = () => (
  <div>
    <Link href="/my-pokemon">
      <a>Go to My Pokemon</a>
    </Link>
    <PokemonList />
  </div>
);

export default Home;
