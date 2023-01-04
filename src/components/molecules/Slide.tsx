import React, { useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Anim, Heading, Text, ExternalLink, ButtonLink } from '..';
import { Container, Row, Col, Visible } from 'react-grid-system';

interface SlideProps {
  title: string;
  text: string;
  label: string;
  link: string;
  buttonType: string;
  offsetRadius: number;
  index: number;
  reverse: boolean;
  moveSlide: (index: number) => void;
}

export default function Slide(props: SlideProps) {
  const { title, text, label, link, buttonType, offsetRadius, index, reverse, moveSlide } = props;
  const down = false;
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  const translateYoffset = 50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle === 0 && down) {
    translateY += 0 / (offsetRadius + 1);
    if (translateY > -40) {
      moveSlide(-1);
    }
    if (translateY < -100) {
      moveSlide(1);
    }
  }
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  const springProp = useSpring({
    to: {
      transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
      top: `${offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius}%`,
      opacity: distanceFactor === 1 ? 1 : 0
    }
  });

  const move = useCallback(
    (num: number) => () => {
      moveSlide(num);
    },
    []
  );

  const getButton = (buttonType: string, link: string, label: string) => {
    switch (buttonType) {
      case 'external':
        return <ExternalLink href={link}>{label}</ExternalLink>;
      case 'internal':
        return <ButtonLink to={link} label={label} />;
      default:
        return null;
    }
  };

  const slideButton = getButton(buttonType, link, label);

  return (
    <animated.div
      data-testid={'slide'}
      style={{
        position: 'absolute',
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformOrigin: '50% 50%',
        ...springProp,
        zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2)
      }}
    >
      <Container onClick={move(offsetFromMiddle)}>
        <Row direction={reverse ? 'row-reverse' : 'row'}>
          <Col sm={12} md={6}>
            <Heading headingLevel="h1">{title}</Heading>
            <Text text={text} />
            {slideButton}
          </Col>
          <Col sm={12} md={6}>
            <Visible md>
              <Anim />
            </Visible>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
}
