import React from 'react';
import styled from 'styled-components';
import { Hidden } from 'react-grid-system';

interface ColorfieldProps {
  color: string;
}

export default function Colorfield(props: ColorfieldProps) {
  return (
    <Hidden xs sm>
      <ColorfieldStyled data-testid={'colorfield'} color={props.color}></ColorfieldStyled>
    </Hidden>
  );
}

const ColorfieldStyled = styled.div.attrs(({ color }) => ({
  style: {
    backgroundColor: color
  }
}))`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 20px;
`;
