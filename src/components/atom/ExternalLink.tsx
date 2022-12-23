import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
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

export default function ExternalLink(props: LinkProps) {
  return (
    <Link role="link" href={props.href} target={'_blank'}>
      {props.children}
    </Link>
  );
}

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
