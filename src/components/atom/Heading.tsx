import React from 'react';
import styled from 'styled-components';

// the interface needs to explicitly declare which strings are safe to pass
interface HeadingProps {
  headingLevel: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
}

const HandleHeadingSize = (props: HeadingProps) => {
  switch (props.headingLevel) {
    case 'h1':
      return '35px';
    case 'h2':
      return '20px';
    case 'h3':
      return '14px';
  }
};

const StyledHeading = styled.div.attrs<HeadingProps>(({ headingLevel }) => ({
  as: headingLevel
}))<HeadingProps>`
  //your style
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  margin: 0;
  margin-bottom: ${(props: HeadingProps) => (props.headingLevel === 'h1' ? '30px' : '20px')};
  line-height: ${(props: HeadingProps) => (props.headingLevel === 'h1' ? '1.07em' : '1.22em')};
  font-size: ${(props: HeadingProps) => HandleHeadingSize(props)};
`;

export default function Heading(props: HeadingProps) {
  return <StyledHeading headingLevel={props.headingLevel}>{props.children}</StyledHeading>;
}
