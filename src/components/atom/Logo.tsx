import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const SvgWrapper = styled.div`
  width: 65px;
  height: 50px;
  padding-top: 10px;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 576px) {
    width: 98px;
    height: 75px;
    padding-top: 0px;
  }
`;

export default function Logo() {
  return (
    <Link to="/" data-testid="logo">
      <SvgWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 98 75">
          <path fill="#FF0" d="M46.67 36.244h-4.52v19.434c-8.7.01-15.909.013-15.923 0l2.277 4.844H46.65l.02-24.278z" />
          <path
            fill="#FF0"
            d="m25.89 45.374.058-.028 7.164-3.088v8.568h4.522V26.518h-.06L7.416 15.707l9.782 20.811 10.144 3.655-6.897 3.234 3.478 7.414h4.536l-2.57-5.447zm-5.68-12.067L15.276 22.84l17.834 6.443v8.644l-12.9-4.62z"
          />
          <path
            fill="#FF0"
            d="M42.15 31.392h4.52l-.047-10.246L7.888 7.158 5.437 1.95 0 0l4.928 10.494L42.15 23.852v7.54zm13.7 24.286V36.244h-4.52l.02 24.277h18.146l2.277-4.844c-.014.015-7.222.01-15.922.001z"
          />
          <path
            fill="#FF0"
            d="M60.368 26.518v24.309h4.521v-8.568l7.165 3.087.058.028-2.575 5.448h4.54l3.48-7.416-6.898-3.233L80.8 36.518l9.782-20.81L60.43 26.52l-.06-.002zm4.521 2.765 17.835-6.443-4.935 10.467-12.9 4.62v-8.644z"
          />
          <path
            fill="#FF0"
            d="M92.564 1.951 90.11 7.158 51.377 21.146l-.047 10.246h4.52v-7.54l37.222-13.358L98 0l-5.436 1.951zM30.799 65.4l4.53 9.6h4.528l-2.233-4.741h22.752l-2.234 4.74h4.53l4.529-9.6H30.799z"
          />
        </svg>
      </SvgWrapper>
    </Link>
  );
}
