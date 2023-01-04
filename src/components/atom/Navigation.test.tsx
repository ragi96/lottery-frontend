import { render, fireEvent } from '@testing-library/react';
import { Navigation } from '..';

test('Slider Navigation exists', () => {
  const moveSlide = jest.fn();
  const { getByTestId } = render(<Navigation moveSlide={moveSlide} />);
  expect(getByTestId('slider-navigation')).toBeInTheDocument();
});

test('Slider Navigation calls correct function on click', () => {
  const moveSlide = jest.fn();
  const { getByTestId } = render(<Navigation moveSlide={moveSlide.apply(1)} />);
  fireEvent.click(getByTestId('slider-navigation'));
  expect(moveSlide).toHaveBeenCalled();
});
