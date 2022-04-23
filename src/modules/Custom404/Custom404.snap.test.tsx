import renderer from 'react-test-renderer';

import Custom404 from './Custom404';

describe('#Custom404 Page', () => {
  it('should renders correctly', () => {
    const tree = renderer.create(<Custom404 />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
