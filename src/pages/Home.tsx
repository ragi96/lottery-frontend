import React, { Component } from 'react';
import { VerticalCarousel } from '../components';
import { config } from '@react-spring/web';
import { SlideContent } from '../types/utils';
import styled from 'styled-components';
import HomeContent from './HomeContent.json';

const StyledHome = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  margin: 0 auto;
`;

export default class Home extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  };

  render() {
    const slides = HomeContent.map((slide: SlideContent) => {
      return {
        key: slide.key,
        title: slide.title,
        text: slide.text,
        label: slide.label,
        link: slide.link,
        buttonType: slide.buttonType,
        reverse: slide.reverse
      };
    });
    return (
      <StyledHome data-testid={'home'}>
        <VerticalCarousel
          slides={slides}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
        />
      </StyledHome>
    );
  }
}
