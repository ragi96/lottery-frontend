import { render } from '@testing-library/react';
import { Anim } from './';

test('animation with img', () => {
  const { getByRole } = render(<Anim />);
  expect(getByRole('img')).toBeInTheDocument();
});

test('animation is webp', () => {
  const { getByRole } = render(<Anim />);
  expect(getByRole('img')).toHaveAttribute('src', 'assets/anim-1v2.webp');
});
