import { render } from '@testing-library/react';
import { ExternalLink } from '..';

test('link exists', () => {
  const { getByRole } = render(<ExternalLink href="/">test</ExternalLink>);
  expect(getByRole('link')).toBeInTheDocument();
});

test('link is a link', () => {
  const { getByRole } = render(<ExternalLink href="/">test</ExternalLink>);
  expect(getByRole('link')).toHaveAttribute('href', '/');
});

test('label is test', () => {
  const { getByRole } = render(<ExternalLink href="/">test</ExternalLink>);
  expect(getByRole('link')).toHaveTextContent('test');
});
