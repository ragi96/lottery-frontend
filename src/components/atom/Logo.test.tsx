import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Logo } from '..';

test('logo exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  expect(getByRole('logo')).toBeInTheDocument();
});

test('logo is a link', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  expect(getByRole('logo')).toHaveAttribute('href', '/');
});

test('logo contains an svg', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  expect(getByRole('logo')).toContainHTML('svg');
});
