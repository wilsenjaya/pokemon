import renderer from 'react-test-renderer';
import PokemonCardLoading from './PokemonCardLoading';

describe('#PokemonCardLoading Component', () => {
  it('should renders correctly with default props', () => {
    const tree = renderer.create(<PokemonCardLoading />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly with withoutCircle props', () => {
    const tree = renderer.create(<PokemonCardLoading withoutCircle />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
