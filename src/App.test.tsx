import { render } from '@testing-library/react';
import App from './App';

test('App exists', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('app')).toBeInTheDocument();
});

test('Header exists in app', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('header')).toBeInTheDocument();
});
