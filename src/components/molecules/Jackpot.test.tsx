import { render } from '@testing-library/react';
import Jackpot from './Jackpot';

test('Jackpot exists', () => {
  const accountPair = '';
  const { getByRole } = render(<Jackpot accountAddress={accountPair} />);
  expect(getByRole('jackpot')).toBeInTheDocument();
});
