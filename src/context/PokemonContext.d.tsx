export type MyPokemonState = {
  [key: string]: Array<PokemonDataType>;
};

export type SetMyPokemonState = (state: MyPokemonState) => void;

export type PokemonDataType = {
  id: string;
  nickName: string;
  pokemonName: string;
  pokemonImage: string;
};

export type PokemonContextType = {
  myPokemon: MyPokemonState;
  addPokemon: Function;
  releasePokemon: Function;
  isNickNameExists: Function;
  getTotalPokemonOwned: Function;
};

export type LayoutProps = {
  children: React.ReactNode;
};
