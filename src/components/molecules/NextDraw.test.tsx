import { render } from '@testing-library/react';
import NextDraw from './NextDraw';

test('next draw exists', () => {
  const accountPair = '';
  const { getByRole } = render(<NextDraw accountAddress={accountPair} />);
  expect(getByRole('next-draw')).toBeInTheDocument();
});
