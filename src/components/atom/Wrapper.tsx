import React from 'react';
import styled from 'styled-components';
import { JustChildProps } from '../../types/utils';

const Wrap = styled.div`
  width: calc(100% - 4px);
  height: calc(100vh - 300px);
  min-height: 450px;
  position: relative;
  justify-content: center;
  border-radius: 50px;
  border: solid 1px #ffff64;
  background-color: #171712;
  margin: 25px auto 0 auto;

  @media (min-width: 576px) {
    max-width: 1064px;
    width: calc(100% - 130px);
    max-height: 500px;
    height: calc(100vh - 300px);
    min-height: 250px;
    box-shadow: 15px 15px 35px 0 rgba(109, 109, 46, 0.8), -15px -15px 35px 0 #d1d9df;
    padding: 55px 54px;
  }
  @media (min-width: 1280px) {
    max-width: 1072px;
    padding: 110px 108px;
  }
`;

export default function Wrapper(props: JustChildProps) {
  return <Wrap data-testid={'wrapper'}>{props.children}</Wrap>;
}
