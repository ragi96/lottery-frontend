import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Lottery } from './';

test('lottery page exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Lottery />
    </BrowserRouter>
  );
  expect(getByRole('lottery')).toBeInTheDocument();
});
