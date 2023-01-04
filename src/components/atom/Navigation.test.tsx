import { render } from '@testing-library/react';
import { Navigation } from '..';

function moveSlide(): void {
  alert('called');
}

test('Slider Navigation exists', () => {
  const { getByTestId } = render(<Navigation moveSlide={moveSlide} />);
  expect(getByTestId('slider-navigation')).toBeInTheDocument();
});
