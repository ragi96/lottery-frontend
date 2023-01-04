import { render, fireEvent } from '@testing-library/react';
import { Button } from '..';

test('button renders', () => {
  const { getByTestId } = render(<Button primary={true} label={'Label'} onClick={jest.fn()} />);
  expect(getByTestId('button')).toBeInTheDocument();
});

test('button renders secondary', () => {
  const { getByTestId } = render(<Button primary={false} label={'Label'} onClick={jest.fn()} />);
  expect(getByTestId('button')).toBeInTheDocument();
});

test('label is test', () => {
  const { getByTestId } = render(<Button primary={true} label={'test'} onClick={jest.fn()} />);
  expect(getByTestId('button')).toHaveTextContent('test');
});

test('calls correct function on click', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<Button primary={true} label={'test'} onClick={onClick} />);
  fireEvent.click(getByTestId('button'));
  expect(onClick).toHaveBeenCalled();
});
