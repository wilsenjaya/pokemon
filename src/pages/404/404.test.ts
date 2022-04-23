import { handleClick } from './404';

describe('#handleClick', () => {
  it('should call router push with correct params', () => {
    const mockRouter = {
      push: jest.fn(),
    };

    // @ts-ignore
    handleClick(mockRouter)();

    expect(mockRouter.push).toBeCalledWith('/');
  });
});
