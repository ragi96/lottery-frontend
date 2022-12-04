import { render } from '@testing-library/react';
import { Heading } from './';

test('heading exists', () => {
  const { getByRole } = render(<Heading headingLevel="h1" text="Header 1" />);
  expect(getByRole('heading')).toBeInTheDocument();
});

test('heading is h1', () => {
  const { getByRole } = render(<Heading headingLevel="h1" text="Header 1" />);
  expect(getByRole('heading').tagName.toLocaleLowerCase()).toBe('h1');
});

test('heading is h2', () => {
  const { getByRole } = render(<Heading headingLevel="h2" text="Header 2" />);
  expect(getByRole('heading').tagName.toLocaleLowerCase()).toBe('h2');
});

test('heading is h3', () => {
  const { getByRole } = render(<Heading headingLevel="h3" text="Header 3" />);
  expect(getByRole('heading').tagName.toLocaleLowerCase()).toBe('h3');
});

test('Heading text is Header', () => {
  const { getByRole } = render(<Heading headingLevel="h1" text="Header" />);
  expect(getByRole('heading')).toHaveTextContent('Header');
});
