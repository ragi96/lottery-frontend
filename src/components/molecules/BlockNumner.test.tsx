import { render } from '@testing-library/react';
import BlockNumber from './BlockNumber';

test('block number exists', () => {
  const { getByRole } = render(<BlockNumber />);
  expect(getByRole('block-number')).toBeInTheDocument();
});
