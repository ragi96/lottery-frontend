import { render } from '@testing-library/react';
import { Scrollbar } from '..';

test('scrollbar renders a wrapper', () => {
  const { getByTestId } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByTestId('scrollbarwrapper')).toBeInTheDocument();
});

test('scrollbar left renders', () => {
  const { getByTestId } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByTestId('scrollbar')).toBeInTheDocument();
});

test('scrollbar right renders', () => {
  const { getByTestId } = render(<Scrollbar length={1} active={0} position={'right'} />);
  expect(getByTestId('scrollbar')).toBeInTheDocument();
});

test('scrollbar height is 33.333333333333336%', () => {
  const { getByTestId } = render(<Scrollbar length={3} active={0} position={'left'} />);
  expect(getByTestId('scrollbar')).toHaveStyle('height: 33.333333333333336%');
});

test('scrollbar height is 50%', () => {
  const { getByTestId } = render(<Scrollbar length={2} active={0} position={'left'} />);
  expect(getByTestId('scrollbar')).toHaveStyle('height: 50%');
});

test('scrollbar height is 100%', () => {
  const { getByTestId } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByTestId('scrollbar')).toHaveStyle('height: 100%');
});

test('scrollbar position left', () => {
  const { getByTestId } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByTestId('scrollbarwrapper')).toHaveStyle('left: 0');
  expect(getByTestId('scrollbarwrapper')).toHaveStyle('right: auto');
});

test('scrollbar position right', () => {
  const { getByTestId } = render(<Scrollbar length={1} active={0} position={'right'} />);
  expect(getByTestId('scrollbarwrapper')).toHaveStyle('left: auto');
  expect(getByTestId('scrollbarwrapper')).toHaveStyle('right: 0');
});
