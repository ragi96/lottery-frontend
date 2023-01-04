import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22em;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding-bottom: 16px;
  display: inline-block;
  margin: 0;

  @media (min-width: 576px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    padding-bottom: 30px;
  }
`;

export default function Text(props: TextProps) {
  return <Paragraph data-testid="text">{props.text}</Paragraph>;
}

interface TextProps {
  text: string;
}
