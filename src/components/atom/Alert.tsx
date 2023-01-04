import React, { ReactElement, useState, useCallback } from 'react';
import styled from 'styled-components';
import { StatusMessages } from '../../types/utils';

const AlertStyled = styled('div')`
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  width: 350px;
  z-index: 1;
  background-color: ${(props: AlertStyledProps) => {
    if (props.type === 'success') {
      return '#00ffff';
    } else if (props.type === 'error') {
      return '#ff3c00';
    } else {
      return '#ffff00';
    }
  }};
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
  children: ReactElement;
  type: 'success' | 'error' | 'warning' | 'none';
  setStatus: (status: StatusMessages) => void;
}

interface AlertStyledProps {
  type: 'success' | 'warning' | 'error';
}

export default function Alert(props: AlertProps) {
  const [isShow, setIsShow] = useState(true);
  const { children, type, setStatus } = props;

  const handleClose = function (e: React.MouseEvent) {
    e.preventDefault();
    setIsShow(false);
    setStatus({ text: '', txHash: '', type: 'none' });
    setIsShow(true);
  };

  const handleCloseCallback = useCallback(handleClose, []);

  if (!isShow || type === 'none') {
    return null;
  }

  return (
    <AlertStyled data-testid={'alert-' + type} type={type}>
      <StyledClose onClick={handleCloseCallback}>&times;</StyledClose>
      {children}
    </AlertStyled>
  );
}
