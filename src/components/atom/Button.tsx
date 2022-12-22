import React from 'react';
import styled from 'styled-components';
import { ButtonStyleProps } from '../../types/utils';

const Btn = styled.button`
  cursor: pointer;
  gap: 4px;
  border-radius: 40px;
  padding: 8px 12px;
  text-decoration: none;
  background-color: transparent;
  border: ${(props: ButtonStyleProps) => (props.primary ? 'solid 1px #ff0' : 'solid 1px #00ffff')};
  font-size: ${(props: ButtonStyleProps) => (props.primary ? '20px' : '14px')};
  color: ${(props: ButtonStyleProps) => (props.primary ? '#ff0' : '#00ffff')};
  &:hover {
    border: solid 1px #fff;
    background-color: ${(props: ButtonStyleProps) => (props.primary ? '#ff0' : '#00ffff')};
    color: #000000;
  }
`;

export default function ButtonOld(props: ButtonProps) {
  return (
    <Btn role="button" onClick={props.onClick} primary={props.primary || false}>
      {props.label}
    </Btn>
  );
}

interface ButtonProps {
  primary: boolean | undefined;
  label: string;
  onClick: (e: React.MouseEvent) => Promise<void>;
}
