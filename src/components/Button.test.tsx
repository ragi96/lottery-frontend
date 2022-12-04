import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from './';

test('button exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Button primary={false} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('button')).toBeInTheDocument();
});

test('button is link', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Button primary={false} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('button')).toHaveAttribute('href', '/');
});

test('button is primary', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Button primary={true} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('button')).toHaveStyle('border: solid 1px #ff0;');
});

test('button is secondary', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Button primary={false} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('button')).toHaveStyle('border: solid 1px #00ffff;');
});

test('label is test', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Button primary={true} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('button')).toHaveTextContent('test');
});
