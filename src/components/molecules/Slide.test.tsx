import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Slide } from '..';

function moveSlide(): void {
  alert('called');
}

test('slide exists', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text="text"
        label="label"
        link="/"
        buttonType="internal"
        offsetRadius={20}
        index={0}
        reverse={false}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByTestId('slide')).toBeInTheDocument();
});

test('slide has title', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text="text"
        label="label"
        link="/"
        buttonType="internal"
        offsetRadius={20}
        index={0}
        reverse={false}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('title')).toBeInTheDocument();
});

test('slide has text', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text="text"
        label="label"
        link="/"
        buttonType="internal"
        offsetRadius={20}
        index={0}
        reverse={false}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('text')).toBeInTheDocument();
});

test('slide has label', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text="text"
        label="label"
        link="/"
        buttonType="internal"
        offsetRadius={20}
        index={0}
        reverse={false}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('label')).toBeInTheDocument();
});

test('slide has internal link', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text="text"
        label="label"
        link="/"
        buttonType="internal"
        offsetRadius={20}
        index={0}
        reverse={false}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByText('label')).toBeInTheDocument();
});

test('slide has external link', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text="text"
        label="label"
        link="https://github.com"
        buttonType="external"
        offsetRadius={20}
        index={0}
        reverse={false}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(getByTestId('link')).toBeInTheDocument();
});

test('slide has no link', () => {
  const { queryByTestId } = render(
    <BrowserRouter>
      <Slide
        title="title"
        text="text"
        label="label"
        link=""
        buttonType=""
        offsetRadius={20}
        index={0}
        reverse={false}
        moveSlide={moveSlide}
      />
    </BrowserRouter>
  );
  expect(queryByTestId('link')).not.toBeInTheDocument();
});
