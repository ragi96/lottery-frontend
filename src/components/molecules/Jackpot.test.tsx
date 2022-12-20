import { render } from '@testing-library/react';
import Jackpot from './Jackpot';

test('Jackpot exists', () => {
  const accountPair = '';
  const { getByRole } = render(<Jackpot accountPair={accountPair} />);
  expect(getByRole('jackpot')).toBeInTheDocument();
});
