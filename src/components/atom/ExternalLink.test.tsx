import { render } from '@testing-library/react';
import { ExternalLink } from '..';

test('link exists', () => {
  const { getByTestId } = render(<ExternalLink href="/">test</ExternalLink>);
  expect(getByTestId('link')).toBeInTheDocument();
});

test('link is a link', () => {
  const { getByTestId } = render(<ExternalLink href="/">test</ExternalLink>);
  expect(getByTestId('link')).toHaveAttribute('href', '/');
});

test('label is test', () => {
  const { getByTestId } = render(<ExternalLink href="/">test</ExternalLink>);
  expect(getByTestId('link')).toHaveTextContent('test');
});
