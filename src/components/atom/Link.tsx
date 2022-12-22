import { Link } from 'react-router-dom';
import { ButtonStyleProps } from '../../types/utils';
import styled from 'styled-components';

const Btn = styled(Link)`
  gap: 4px;
  border-radius: 40px;
  padding: 8px 12px;
  text-decoration: none;
  border: ${(props: ButtonStyleProps) => (props.primary ? 'solid 1px #ff0' : 'solid 1px #00ffff')};
  font-size: ${(props: ButtonStyleProps) => (props.primary ? '20px' : '14px')};
  &:hover {
    border: solid 1px #fff;
    background-color: ${(props: ButtonStyleProps) => (props.primary ? '#ff0' : '#00ffff')};
    span {
      color: #000;
    }
  }
  span {
    color: ${(props: ButtonStyleProps) => (props.primary ? '#ff0' : '#00ffff')};
  }
`;

export default function StyledLink(props: LinkProps) {
  return (
    <Btn role="link" to={props.to} primary={props.primary}>
      <span>{props.label}</span>
    </Btn>
  );
}

interface LinkProps {
  primary: boolean;
  to: string;
  label: string;
}
