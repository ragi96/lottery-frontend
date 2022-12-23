import React from 'react';
import styled from 'styled-components';

const ScrollbarWrapper = styled.div`
  width: 8px;
  height: calc(100% - 120px);
  position: absolute;
  top: 60px;
  bottom: 60px;
  left: ${(props: ScrollbarStyleWrapperProps) => (props.position === 'left' ? '0' : 'auto')};
  right: ${(props: ScrollbarStyleWrapperProps) => (props.position === 'right' ? '0' : 'auto')};
`;

const ScrollbarStyled = styled.div`
  width: 100%;
  height: ${(props: ScrollbarStyleProps) => (100 / props.length).toString() + '%'};
  position: absolute;
  background-color: #ff3c00ed;
  border-radius: 60px;
  top: 0;
  transform: translateY(${(props: ScrollbarStyleProps) => (100 * props.active).toString() + '%'});
  transition: transform 0.5s ease-in-out;
`;

interface ScrollbarProps {
  length: number;
  active: number;
  position: 'left' | 'right';
}

interface ScrollbarStyleProps {
  length: number;
  active: number;
}

interface ScrollbarStyleWrapperProps {
  position: 'left' | 'right';
}

export default function Scrollbar(props: ScrollbarProps) {
  const { length, active, position } = props;
  return (
    <ScrollbarWrapper role={'scrollbarwrapper'} position={position}>
      <ScrollbarStyled role={'scrollbar'} length={length} active={active}></ScrollbarStyled>;
    </ScrollbarWrapper>
  );
}
