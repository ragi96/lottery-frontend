import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled(Link)`
  gap: 4px;
  border-radius: 40px;
  padding: 8px 12px;
  text-decoration: none;
  border: solid 1px #ff0;
  font-size: 20px;
  color: #ff0;
  &:hover {
    border: solid 1px #fff;
    background-color: #ff0;
    color: #000;
  }
`;

export default function ButtonLink(props: LinkProps) {
  return (
    <Btn role="link" to={props.to}>
      <span>{props.label}</span>
    </Btn>
  );
}

interface LinkProps {
  to: string;
  label: string;
}
