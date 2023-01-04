import { render } from '@testing-library/react';
import LotteryHeader from './LotteryHeader';

const accountPair = '';

test('lottery header exists', () => {
  const { getByTestId } = render(<LotteryHeader accountAddress={accountPair} />);
  expect(getByTestId('lottery-header')).toBeInTheDocument();
});

test('lottery header has flex wrapper', () => {
  const { getByTestId } = render(<LotteryHeader accountAddress={accountPair} />);
  expect(getByTestId('flex-lottery-header')).toBeInTheDocument();
});

test('flex wrapper has 3 childs', () => {
  const { getByTestId } = render(<LotteryHeader accountAddress={accountPair} />);
  expect(getByTestId('flex-lottery-header').children.length).toBe(3);
});

test('lottery header has block number', () => {
  const { getByTestId } = render(<LotteryHeader accountAddress={accountPair} />);
  expect(getByTestId('block-number')).toBeInTheDocument();
});

test('lottery header has jackpot', () => {
  const { getByTestId } = render(<LotteryHeader accountAddress={accountPair} />);
  expect(getByTestId('jackpot')).toBeInTheDocument();
});

test('lottery header next-draw', () => {
  const { getByTestId } = render(<LotteryHeader accountAddress={accountPair} />);
  expect(getByTestId('next-draw')).toBeInTheDocument();
});
