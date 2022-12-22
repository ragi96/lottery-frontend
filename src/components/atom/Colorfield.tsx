import React from 'react';
import styled from 'styled-components';

const ColorfieldStyled = styled.div.attrs(({ color }) => ({
  style: {
    backgroundColor: color
  }
}))`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;

export default function Colorfield(props: ColorfieldProps) {
  return <ColorfieldStyled role={'colorfield'} color={props.color}></ColorfieldStyled>;
}

interface ColorfieldProps {
  color: string;
}
