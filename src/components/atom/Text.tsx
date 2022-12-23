import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22rem;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding-bottom: 16px;
  display: inline-block;

  @media (min-width: 1280px) {
    padding-bottom: 30px;
  }
`;

export default function Text(props: TextProps) {
  return <Paragraph role="text">{props.text}</Paragraph>;
}

interface TextProps {
  text: string;
}
