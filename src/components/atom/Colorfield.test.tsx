import { render } from '@testing-library/react';
import { Colorfield } from '..';

test('ani', () => {
  const { getByRole } = render(<Colorfield color="red" />);
  expect(getByRole('colorfield')).toBeInTheDocument();
});
