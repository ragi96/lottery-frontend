import React, { ReactElement, JSXElementConstructor, useState } from 'react';
import styled from 'styled-components';
import ExternalLink from './ExternalLink';

const AlertStyled = styled('div')`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  max-width: 350px;
  z-index: 1;
  background-color: ${(props: AlertStyledProps) => (props.type === 'success' ? '#00ffff' : '#ff3c00')};

  p {
    color: #000000;
  }
`;

const StyledClose = styled('span')`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #000000;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface AlertProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  type: 'success' | 'error' | 'none';
}

interface AlertStyledProps {
  type: 'success' | 'error';
}

export default function Alert(props: AlertProps) {
  const [isShow, setIsShow] = useState(true);
  const { children, type } = props;

  const handleClose = function (e: React.MouseEvent) {
    e.preventDefault();
    setIsShow(false);
  };

  if (!isShow || type === 'none') {
    return null;
  }

  return (
    <AlertStyled type={type}>
      <StyledClose onClick={handleClose}>&times;</StyledClose>
      {children}
    </AlertStyled>
  );
}
