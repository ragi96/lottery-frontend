import { render } from '@testing-library/react';
import { LoadingCircle } from '..';

test('LoadingCircle renders', () => {
  const { getByTestId } = render(<LoadingCircle />);
  expect(getByTestId('loading-circle')).toBeInTheDocument();
});
