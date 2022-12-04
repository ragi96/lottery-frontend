import { render } from '@testing-library/react';
import { Wrapper } from './';

test('wrapper exists', () => {
  const { getByRole } = render(
    <Wrapper>
      <p>test</p>
    </Wrapper>
  );
  expect(getByRole('wrapper')).toBeInTheDocument();
});

test('wrapper contains children', () => {
  const { getByRole } = render(
    <Wrapper>
      <p>test</p>
    </Wrapper>
  );
  expect(getByRole('wrapper')).toContainHTML('test');
});
