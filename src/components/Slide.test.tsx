import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Slide } from './';

function moveSlide(): void {
  alert('called');
}

test('slide exists', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text1="text1"
        text2="text2"
        label="label"
        link="/"
        offsetRadius={20}
        index={0}
        reverse={false}
        animationConfig={1}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByRole('slide')).toBeInTheDocument();
});

test('slide has title', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text1="text1"
        text2="text2"
        label="label"
        link="/"
        offsetRadius={20}
        index={0}
        reverse={false}
        animationConfig={1}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('title')).toBeInTheDocument();
});

test('slide has text1', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text1="text1"
        text2="text2"
        label="label"
        link="/"
        offsetRadius={20}
        index={0}
        reverse={false}
        animationConfig={1}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('text1')).toBeInTheDocument();
});

test('slide has text2', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text1="text1"
        text2="text2"
        label="label"
        link="/"
        offsetRadius={20}
        index={0}
        reverse={false}
        animationConfig={1}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('text2')).toBeInTheDocument();
});

test('slide has label', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text1="text1"
        text2="text2"
        label="label"
        link="/"
        offsetRadius={20}
        index={0}
        reverse={false}
        animationConfig={1}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('label')).toBeInTheDocument();
});

test('slide has link', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text1="text1"
        text2="text2"
        label="label"
        link="/"
        offsetRadius={20}
        index={0}
        reverse={false}
        animationConfig={1}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('label')).toBeInTheDocument();
});
