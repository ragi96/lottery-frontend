import { render } from '@testing-library/react';
import { Heading } from '..';

test('heading exists', () => {
  const { getByTestId } = render(<Heading headingLevel="h1">Test</Heading>);
  expect(getByTestId('heading')).toBeInTheDocument();
});

test('heading is h1', () => {
  const { getByTestId } = render(<Heading headingLevel="h1">Header 1</Heading>);
  expect(getByTestId('heading').tagName.toLocaleLowerCase()).toBe('h1');
});

test('heading is h2', () => {
  const { getByTestId } = render(<Heading headingLevel="h2">Header 2</Heading>);
  expect(getByTestId('heading').tagName.toLocaleLowerCase()).toBe('h2');
});

test('heading is h3', () => {
  const { getByTestId } = render(<Heading headingLevel="h3">Header 3</Heading>);
  expect(getByTestId('heading').tagName.toLocaleLowerCase()).toBe('h3');
});

test('Heading text is Header', () => {
  const { getByTestId } = render(<Heading headingLevel="h1">Header</Heading>);
  expect(getByTestId('heading')).toHaveTextContent('Header');
});
