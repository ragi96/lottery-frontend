import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Btn = styled(Link)`
  gap: 4px;
  border-radius: 40px;
  padding: 8px 12px;
  text-decoration: none;
  border: ${(props: ButtonStyleProps) =>
    props.primary ? "solid 1px #ff0" : "solid 1px #00ffff"};
  font-size: ${(props: ButtonStyleProps) => (props.primary ? "20px" : "14px")};
  &:hover {
    border: solid 1px #fff;
    background-color: ${(props: ButtonStyleProps) =>
    props.primary ? "#ff0" : "#00ffff"};
    span {
      color: #000;
    }
  }
  span {
    color: ${(props: ButtonStyleProps) => (props.primary ? "#ff0" : "#00ffff")};
  }
`;

interface ButtonStyleProps {
  primary: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <Btn role="button" to={props.to} primary={props.primary}>
      <span>{props.label}</span>
    </Btn>
  );
}

interface ButtonProps {
  primary: boolean;
  to: string;
  label: string;
}
