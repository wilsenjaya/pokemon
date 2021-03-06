import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

import {
  MyPokemonState,
  SetMyPokemonState,
  PokemonDataType,
  PokemonContextType,
  LayoutProps,
} from './PokemonContext.d';
import constants from '../constants';

const { POKEMON_STORAGE_KEY: KEY } = constants;

const PokemonContext = createContext<PokemonContextType | null>(null);

export const addPokemon = (
  myPokemon: MyPokemonState,
  setMyPokemon: SetMyPokemonState,
) => (id: string, data: PokemonDataType): void => {
  const newPokemon = cloneDeep(myPokemon);
  if (myPokemon[id]) newPokemon[id].push(data);
  else newPokemon[id] = [data];

  setMyPokemon(newPokemon);
  localStorage.setItem(KEY, JSON.stringify(newPokemon));
};

export const releasePokemon = (
  myPokemon: MyPokemonState,
  setMyPokemon: SetMyPokemonState,
) => (id: string, nickName: string): void => {
  const newPokemon = cloneDeep(myPokemon);
  if (myPokemon[id]) {
    const index = newPokemon[id].findIndex((item) => item.nickName === nickName);
    if (newPokemon[id].length <= 1) delete newPokemon[id];
    else newPokemon[id].splice(index, 1);
  }
  setMyPokemon(newPokemon);
  localStorage.setItem(KEY, JSON.stringify(newPokemon));
};

export const isNickNameExists = (
  myPokemon: MyPokemonState,
) => (id: string, nickName: string): boolean => myPokemon[id]?.some((x) => x.nickName === nickName);

export const getTotalPokemonOwned = (
  myPokemon: MyPokemonState,
) => (id: string): number => {
  if (myPokemon[id]) return Object.values(myPokemon[id]).length;
  return 0;
};

export const PokemonContextProvider = ({ children }: LayoutProps) => {
  const [myPokemon, setMyPokemon] = useState({});

  useEffect(() => {
    if (!isEmpty(JSON.parse(localStorage.getItem(KEY)!))) {
      setMyPokemon(JSON.parse(localStorage.getItem(KEY)!));
    }
  }, []);

  const defaultContext = useMemo(
    () => ({
      myPokemon,
      addPokemon: addPokemon(myPokemon, setMyPokemon),
      releasePokemon: releasePokemon(myPokemon, setMyPokemon),
      isNickNameExists: isNickNameExists(myPokemon),
      getTotalPokemonOwned: getTotalPokemonOwned(myPokemon),
    }),
    [myPokemon],
  );

  return (
    <PokemonContext.Provider value={defaultContext}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
