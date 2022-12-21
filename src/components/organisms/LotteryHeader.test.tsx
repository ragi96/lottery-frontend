import { render } from '@testing-library/react';
import LotteryHeader from './LotteryHeader';
const accountPair = '';
test('lottery header exists', () => {
  const { getByRole } = render(<LotteryHeader accountPair={accountPair} />);
  expect(getByRole('lottery-header')).toBeInTheDocument();
});

test('lottery header has flex wrapper', () => {
  const { getByRole } = render(<LotteryHeader accountPair={accountPair} />);
  expect(getByRole('flex-lottery-header')).toBeInTheDocument();
});

test('flex wrapper has 3 childs', () => {
  const { getByRole } = render(<LotteryHeader accountPair={accountPair} />);
  expect(getByRole('flex-lottery-header').children.length).toBe(3);
});

test('lottery header has block number', () => {
  const { getByRole } = render(<LotteryHeader accountPair={accountPair} />);
  expect(getByRole('block-number')).toBeInTheDocument();
});

test('lottery header has jackpot', () => {
  const { getByRole } = render(<LotteryHeader accountPair={accountPair} />);
  expect(getByRole('jackpot')).toBeInTheDocument();
});

test('lottery header next-draw', () => {
  const { getByRole } = render(<LotteryHeader accountPair={accountPair} />);
  expect(getByRole('next-draw')).toBeInTheDocument();
});
