import { render } from '@testing-library/react';
import { Heading } from '..';

test('heading exists', () => {
  const { getByRole } = render(<Heading headingLevel="h1">Test</Heading>);
  expect(getByRole('heading')).toBeInTheDocument();
});

test('heading is h1', () => {
  const { getByRole } = render(<Heading headingLevel="h1">Header 1</Heading>);
  expect(getByRole('heading').tagName.toLocaleLowerCase()).toBe('h1');
});

test('heading is h2', () => {
  const { getByRole } = render(<Heading headingLevel="h2">Header 2</Heading>);
  expect(getByRole('heading').tagName.toLocaleLowerCase()).toBe('h2');
});

test('heading is h3', () => {
  const { getByRole } = render(<Heading headingLevel="h3">Header 3</Heading>);
  expect(getByRole('heading').tagName.toLocaleLowerCase()).toBe('h3');
});

test('Heading text is Header', () => {
  const { getByRole } = render(<Heading headingLevel="h1">Header</Heading>);
  expect(getByRole('heading')).toHaveTextContent('Header');
});
