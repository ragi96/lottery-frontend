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

export default function Button(props: ButtonProps) {
  return (
    <Btn role="button" onClick={props.onClick} primary={props.primary}>
      <span>{props.label}</span>
    </Btn>
  );
}

interface ButtonProps {
  primary: boolean;
  label: string;
  onClick: (e: React.MouseEvent) => Promise<void>;
}
