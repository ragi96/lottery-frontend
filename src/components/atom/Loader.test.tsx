import { render } from '@testing-library/react';
import { Loader } from '..';

test('Loader renders', () => {
  const { getByRole } = render(<Loader>Test</Loader>);
  expect(getByRole('loader')).toBeInTheDocument();
});
