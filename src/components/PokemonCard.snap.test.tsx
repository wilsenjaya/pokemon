/* eslint-disable react/jsx-props-no-spreading */
import renderer from 'react-test-renderer';

import PokemonCard from './PokemonCard';

describe('#PokemonCard Component', () => {
  const props = {
    id: '1',
    name: 'bulbasaur',
    image: 'https://picsum.photos/200/',
  };

  it('should renders correctly with default props', () => {
    const tree = renderer.create(<PokemonCard {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly with optional props', () => {
    const mockProps = {
      ...props,
      nickName: 'bulba',
      totalOwned: 1,
      onRemove: jest.fn(),
    };

    const tree = renderer.create(<PokemonCard {...mockProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
