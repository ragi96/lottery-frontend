import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '..';

test('header exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByRole('header')).toBeInTheDocument();
});

test('logo exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByRole('logo')).toBeInTheDocument();
});

test('link exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByRole('link')).toBeInTheDocument();
});

test('link leads to lottery', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByRole('link')).toHaveAttribute('href', '/lottery');
});

test('link is primary', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByRole('link')).toHaveStyle('border: solid 1px #ff0');
});
