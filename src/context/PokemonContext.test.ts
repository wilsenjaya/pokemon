import {
  addPokemon,
  releasePokemon,
  isNickNameExists,
  getTotalPokemonOwned,
} from './PokemonContext';
import constants from '../constants';

const { POKEMON_STORAGE_KEY: KEY } = constants;

const myPokemon = {
  1: [{
    id: '1',
    nickName: 'bulba',
    pokemonName: 'bulbasaur',
    pokemonImage: 'https://picsum.photos/200/',
  }],
  2: [{
    id: '2',
    nickName: 'ivy',
    pokemonName: 'ivysaur',
    pokemonImage: 'https://picsum.photos/200/',
  },
  {
    id: '2',
    nickName: 'saur',
    pokemonName: 'ivysaur',
    pokemonImage: 'https://picsum.photos/200/',
  }],
};

jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem');

describe('#addPokemon', () => {
  const mockSetPokemon = jest.fn();
  it('should call setPokemon and localStorage with correct data on different pokemon', () => {
    const newPokemonData = {
      id: '3',
      nickName: 'venus',
      pokemonName: 'venusaur',
      pokemonImage: 'https://picsum.photos/200/',
    };
    const expectedResult = {
      ...myPokemon,
      3: [newPokemonData],
    };

    addPokemon(myPokemon, mockSetPokemon)(newPokemonData.id, newPokemonData);

    expect(mockSetPokemon).toBeCalledWith(expectedResult);
    expect(localStorage.setItem).toBeCalledWith(KEY, JSON.stringify(expectedResult));
  });

  it('should call setPokemon and localStorage with correct data on the same pokemon', () => {
    const newPokemonData = {
      id: '1',
      nickName: 'boba',
      pokemonName: 'bulasaur',
      pokemonImage: 'https://picsum.photos/200/',
    };
    const expectedResult = {
      ...myPokemon,
      1: [...myPokemon[1], ...[newPokemonData]],
    };

    addPokemon(myPokemon, mockSetPokemon)(newPokemonData.id, newPokemonData);

    expect(mockSetPokemon).toBeCalledWith(expectedResult);
    expect(localStorage.setItem).toBeCalledWith(KEY, JSON.stringify(expectedResult));
  });
});

describe('#releasePokemon', () => {
  const mockSetPokemon = jest.fn();
  it('should call setPokemon and localStorage with correct data when delete pokemon', () => {
    const mockRemovedData = {
      id: '2',
      nickName: 'saur',
    };
    const expectedResult = {
      ...myPokemon,
      2: [myPokemon[2][0]],
    };

    releasePokemon(myPokemon, mockSetPokemon)(mockRemovedData.id, mockRemovedData.nickName);

    expect(mockSetPokemon).toBeCalledWith(expectedResult);
    expect(localStorage.setItem).toBeCalledWith(KEY, JSON.stringify(expectedResult));
  });

  it('should call setPokemon and localStorage with correct data when delete the last same pokemon', () => {
    const mockRemovedData = {
      id: '1',
      nickName: 'bulba',
    };
    const expectedResult = { 2: [...myPokemon[2]] };

    releasePokemon(myPokemon, mockSetPokemon)(mockRemovedData.id, mockRemovedData.nickName);

    expect(mockSetPokemon).toBeCalledWith(expectedResult);
    expect(localStorage.setItem).toBeCalledWith(KEY, JSON.stringify(expectedResult));
  });
});

describe('#isNickNameExists', () => {
  it('should return true if nickname already exists in myPokemon state', () => {
    const selectedData = {
      id: '1',
      nickName: 'bulba',
    };

    const result = isNickNameExists(myPokemon)(selectedData.id, selectedData.nickName);

    expect(result).toBeTruthy();
  });

  it('should return false if nickname not exists in myPokemon state', () => {
    const selectedData = {
      id: '1',
      nickName: 'charly',
    };

    const result = isNickNameExists(myPokemon)(selectedData.id, selectedData.nickName);

    expect(result).toBeFalsy();
  });
});

describe('#getTotalPokemonOwned', () => {
  it('should return total pokemon owned', () => {
    const selectedId = '2';

    const result = getTotalPokemonOwned(myPokemon)(selectedId);

    expect(result).toBe(myPokemon[selectedId].length);
  });

  it('should return 0 if selectedId not found', () => {
    const selectedId = '5';

    const result = getTotalPokemonOwned(myPokemon)(selectedId);

    expect(result).toBe(0);
  });
});
