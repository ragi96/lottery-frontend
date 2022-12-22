import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ButtonLink } from '..';

test('link exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <ButtonLink to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('link')).toBeInTheDocument();
});

test('label is test', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <ButtonLink to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByRole('link')).toHaveTextContent('test');
});
