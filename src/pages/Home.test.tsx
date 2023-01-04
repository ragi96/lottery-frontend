import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './';

test('home page exists', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getByTestId('home')).toBeInTheDocument();
});

test('home page contains a vertical carousel', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getByTestId('verticalCarousel')).toBeInTheDocument();
});

test('home page contains a vertical carousel with 3 slides', () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getAllByTestId('slide')).toHaveLength(3);
});
