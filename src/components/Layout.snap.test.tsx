import renderer from 'react-test-renderer';
import Layout from './Layout';

describe('#Layout Component', () => {
  it('should renders correctly', () => {
    const children = (<p>test</p>);

    const tree = renderer.create(<Layout>{children}</Layout>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
