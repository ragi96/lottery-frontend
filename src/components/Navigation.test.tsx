import { render } from '@testing-library/react';
import { Navigation } from './';

function moveSlide(): void {
  alert('called');
}

test('Slider Navigation exists', () => {
  const { getByRole } = render(<Navigation moveSlide={moveSlide} />);
  expect(getByRole('slider-navigation')).toBeInTheDocument();
});
