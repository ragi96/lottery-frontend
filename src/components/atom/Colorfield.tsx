import React from 'react';
import styled from 'styled-components';
import { Hidden } from 'react-grid-system';

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
  return (
    <Hidden xs sm>
      <ColorfieldStyled role={'colorfield'} color={props.color}></ColorfieldStyled>
    </Hidden>
  );
}

interface ColorfieldProps {
  color: string;
}
