import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StyledLink } from '..';

test('link exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <StyledLink primary={false} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('link')).toBeInTheDocument();
});

test('link is a link', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <StyledLink primary={false} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('link')).toHaveAttribute('href', '/');
});

test('link is primary', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <StyledLink primary={true} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('link')).toHaveStyle('border: solid 1px #ff0;');
});

test('link is secondary', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <StyledLink primary={false} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('link')).toHaveStyle('border: solid 1px #00ffff;');
});

test('label is test', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <StyledLink primary={true} to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('link')).toHaveTextContent('test');
});
