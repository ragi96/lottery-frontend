import { render } from '@testing-library/react';
import { Loader } from '..';

test('Loader renders', () => {
  const { getByTestId } = render(<Loader>Test</Loader>);
  expect(getByTestId('loader')).toBeInTheDocument();
});
