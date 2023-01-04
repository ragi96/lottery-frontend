import { render } from '@testing-library/react';
import Jackpot from './Jackpot';

test('Jackpot exists', () => {
  const accountPair = '';
  const { getByTestId } = render(<Jackpot accountAddress={accountPair} />);
  expect(getByTestId('jackpot')).toBeInTheDocument();
});
