import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '..';

test('header exists', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByTestId('header')).toBeInTheDocument();
});

test('logo exists', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByTestId('logo')).toBeInTheDocument();
});

test('link exists', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByTestId('link')).toBeInTheDocument();
});

test('link leads to lottery', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByTestId('link')).toHaveAttribute('href', '/lottery');
});

test('link is primary', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(getByTestId('link')).toHaveStyle('border: solid 1px #ff0');
});
