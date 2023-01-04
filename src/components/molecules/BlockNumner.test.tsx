import { render } from '@testing-library/react';
import BlockNumber from './BlockNumber';

test('block number exists', () => {
  const { getByTestId } = render(<BlockNumber />);
  expect(getByTestId('block-number')).toBeInTheDocument();
});
