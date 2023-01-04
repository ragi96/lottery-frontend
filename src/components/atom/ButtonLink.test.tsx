import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ButtonLink } from '..';

test('link exists', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <ButtonLink to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByTestId('link')).toBeInTheDocument();
});

test('label is test', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <ButtonLink to="/" label="test" />
    </BrowserRouter>
  );
  expect(getByTestId('link')).toHaveTextContent('test');
});
