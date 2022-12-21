import { render } from '@testing-library/react';
import { LoadingCircle } from '..';

test('LoadingCircle renders', () => {
  const { getByRole } = render(<LoadingCircle />);
  expect(getByRole('loading-circle')).toBeInTheDocument();
});
