import { render } from '@testing-library/react';
import { Text } from '..';

test('text exists', () => {
  const { getByTestId } = render(<Text text="text" />);
  expect(getByTestId('text')).toBeInTheDocument();
});

test('text contains text', () => {
  const { getByTestId } = render(<Text text="text" />);
  expect(getByTestId('text')).toContainHTML('text');
});
