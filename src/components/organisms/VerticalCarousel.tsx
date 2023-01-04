import React, { Component } from 'react';
import { Hidden } from 'react-grid-system';
import { Slide, Wrapper, Navigation, Scrollbar } from '..';
import { SlideContent } from '../../types/utils';

function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}

interface VerticalCarouselProps {
  slides: SlideContent[];
  offsetRadius: number;
  showNavigation: boolean;
}

class VerticalCarousel extends Component<VerticalCarouselProps> {
  state = {
    index: 0,
    goToSlide: 0,
    prevPropsGoToSlide: 0,
    newSlide: false
  };

  touchStartY = 0;
  touchEndY = 0;
  waitHandle = false;

  componentDidMount = () => {
    window.addEventListener('wheel', this.handleWheel);
    window.addEventListener('touchstart', this.handleTouchStart);
  };

  handleTouchStart = (e: TouchEvent) => {
    this.touchStartY = e.touches[0].clientY;
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
  };

  handleTouchMove = (e: TouchEvent) => {
    this.touchEndY = e.touches[0].clientY;
  };

  handleTouchEnd = (e: TouchEvent) => {
    this.touchEndY = e.changedTouches[0].clientY;
    if (this.touchEndY > this.touchStartY) {
      this.moveSlide(1);
    }
    if (this.touchEndY < this.touchStartY) {
      this.moveSlide(-1);
    }
  };

  handleWheel = (e: WheelEvent) => {
    if (!this.waitHandle) {
      this.waitHandle = true;
      if (e.deltaY < 0) {
        this.moveSlide(-1);
      } else {
        this.moveSlide(1);
      }
      setTimeout(() => {
        this.waitHandle = false;
      }, 750);
    }
  };

  modBySlidesLength = (index: number) => {
    return mod(index, this.props.slides.length);
  };

  moveSlide = (direction: number) => {
    this.setState({
      index: this.modBySlidesLength(this.state.index + direction)
    });
  };

  clampOffsetRadius(offsetRadius: number) {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides() {
    const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[this.modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  }

  render() {
    const { offsetRadius, showNavigation } = this.props;

    let navigationButtons = null;
    if (showNavigation) {
      navigationButtons = <Navigation moveSlide={this.moveSlide} />;
    }

    return (
      <div>
        <div data-testid={'verticalCarousel'}>
          <Wrapper>
            <Scrollbar length={this.props.slides.length} position="left" active={this.state.index} />
            {this.getPresentableSlides().map((slide, presentableIndex) => (
              <Slide
                key={slide.key}
                title={slide.title}
                text={slide.text}
                label={slide.label}
                link={slide.link}
                buttonType={slide.buttonType}
                reverse={slide.reverse}
                moveSlide={this.moveSlide}
                offsetRadius={this.clampOffsetRadius(offsetRadius)}
                index={presentableIndex}
              />
            ))}
            {navigationButtons}
            <Hidden xs>
              <Scrollbar length={this.props.slides.length} position="right" active={this.state.index} />
            </Hidden>
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default VerticalCarousel;
