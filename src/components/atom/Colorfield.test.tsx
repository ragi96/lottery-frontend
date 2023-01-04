import { render } from '@testing-library/react';
import { Colorfield } from '..';

test('ani', () => {
  const { getByTestId } = render(<Colorfield color="red" />);
  expect(getByTestId('colorfield')).toBeInTheDocument();
});
