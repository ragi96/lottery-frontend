import { render } from '@testing-library/react';
import NextDraw from './NextDraw';

test('next draw exists', () => {
  const accountPair = '';
  const { getByTestId } = render(<NextDraw accountAddress={accountPair} />);
  expect(getByTestId('next-draw')).toBeInTheDocument();
});
