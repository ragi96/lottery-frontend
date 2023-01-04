import { render } from '@testing-library/react';
import { Wrapper } from '..';

test('wrapper exists', () => {
  const { getByTestId } = render(
    <Wrapper>
      <p>test</p>
    </Wrapper>
  );
  expect(getByTestId('wrapper')).toBeInTheDocument();
});

test('wrapper contains children', () => {
  const { getByTestId } = render(
    <Wrapper>
      <p>test</p>
    </Wrapper>
  );
  expect(getByTestId('wrapper')).toContainHTML('test');
});
