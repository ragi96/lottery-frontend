import { render } from '@testing-library/react';
import { Scrollbar } from '..';

test('scrollbar renders a wrapper', () => {
  const { getByRole } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByRole('scrollbarwrapper')).toBeInTheDocument();
});

test('scrollbar left renders', () => {
  const { getByRole } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByRole('scrollbar')).toBeInTheDocument();
});

test('scrollbar right renders', () => {
  const { getByRole } = render(<Scrollbar length={1} active={0} position={'right'} />);
  expect(getByRole('scrollbar')).toBeInTheDocument();
});

test('scrollbar height is 33.333333333333336%', () => {
  const { getByRole } = render(<Scrollbar length={3} active={0} position={'left'} />);
  expect(getByRole('scrollbar')).toHaveStyle('height: 33.333333333333336%');
});

test('scrollbar height is 50%', () => {
  const { getByRole } = render(<Scrollbar length={2} active={0} position={'left'} />);
  expect(getByRole('scrollbar')).toHaveStyle('height: 50%');
});

test('scrollbar height is 100%', () => {
  const { getByRole } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByRole('scrollbar')).toHaveStyle('height: 100%');
});

test('scrollbar position left', () => {
  const { getByRole } = render(<Scrollbar length={1} active={0} position={'left'} />);
  expect(getByRole('scrollbarwrapper')).toHaveStyle('left: 0');
  expect(getByRole('scrollbarwrapper')).toHaveStyle('right: auto');
});

test('scrollbar position right', () => {
  const { getByRole } = render(<Scrollbar length={1} active={0} position={'right'} />);
  expect(getByRole('scrollbarwrapper')).toHaveStyle('left: auto');
  expect(getByRole('scrollbarwrapper')).toHaveStyle('right: 0');
});
