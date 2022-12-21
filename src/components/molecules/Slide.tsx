import React, { useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Anim, Heading, Text, Button } from '..';
import { Container, Row, Col } from 'react-grid-system';

interface SlideProps {
  title: string;
  text1: string;
  text2: string;
  label: string;
  link: string;
  offsetRadius: number;
  index: number;
  reverse: boolean;
  moveSlide: (index: number) => void;
}

export default function Slide(props: SlideProps) {
  const { title, text1, text2, label, link, offsetRadius, index, reverse, moveSlide } = props;
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

  return (
    <animated.div
      role={'slide'}
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
            <Text text={text1} />
            <Text text={text2} />
            <Button to={link} label={label} primary={true} />
          </Col>
          <Col sm={12} md={6}>
            <Anim />
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
}
