import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Logo } from '..';

test('logo exists', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  expect(getByTestId('logo')).toBeInTheDocument();
});

test('logo is a link', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  expect(getByTestId('logo')).toHaveAttribute('href', '/');
});

test('logo contains an svg', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  expect(getByTestId('logo')).toContainHTML('svg');
});
