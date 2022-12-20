import { render } from '@testing-library/react';
import App from './App';

test('App exists', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('app')).toBeInTheDocument();
});

test('Header exists in app', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('header')).toBeInTheDocument();
});
