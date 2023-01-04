import React from 'react';
import styled from 'styled-components';
import { LoadingCircle } from '..';
import { JustChildProps } from '../../types/utils';

const Dimmer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #000;
`;

const CenterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 350px;

  p {
    color: #ff0;
    text-align: center;
  }
`;

const PositionedLoadingCircle = styled.div`
  margin: 0 auto 20px auto;
  display: block;
  width: 135px;
`;

export default function Loader(props: JustChildProps) {
  return (
    <Dimmer data-testid={'loader'}>
      <CenterWrapper>
        <PositionedLoadingCircle>
          <LoadingCircle fill={'#ff0'} />
        </PositionedLoadingCircle>
        {props.children}
      </CenterWrapper>
    </Dimmer>
  );
}
