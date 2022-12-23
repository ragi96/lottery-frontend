import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: auto;
`;
export default function Anim() {
  return <Image src="assets/anim-1v2.webp" width={'502px'} height={'390px'} alt="animation" loading="lazy" />;
}
