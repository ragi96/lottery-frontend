import React from 'react';
import styled from 'styled-components';
import { JustChildProps } from '../../types/JustChild';

const Wrap = styled.div`
  width: calc(100% - 4px);
  max-width: 1064px;
  height: 420px;
  position: relative;
  justify-content: center;
  border-radius: 50px;
  border: solid 1px #ffff64;
  background-color: #171712;
  margin: 25px auto 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
  @media (min-width: 1280px) {
    padding: 110px 108px;
    margin-top: 120px;
    height: 540px;
    box-shadow: 15px 15px 35px 0 rgba(109, 109, 46, 0.8), -15px -15px 35px 0 #d1d9df;
  }
`;

export default function Wrapper(props: JustChildProps) {
  return <Wrap role={'wrapper'}>{props.children}</Wrap>;
}
