import React from 'react';
import styled from 'styled-components';
import { Logo, ButtonLink } from '../';

const Wrapper = styled.header`
  width: calc(100% - 2rem);
  height: 75px;
  margin: 0 auto 0 auto;
  padding: 1rem 1rem 0 1rem;

  a:first-child {
    float: left;
  }
  a:last-child {
    float: right;
    margin-top: 19px;
  }

  @media (min-width: 576px) {
    margin-bottom: 40px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
`;

export default function Header() {
  return (
    <Wrapper data-testid="header">
      <Logo />
      <ButtonLink to="/lottery" label="Go To Lottery" />
    </Wrapper>
  );
}
