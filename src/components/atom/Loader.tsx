import styled from 'styled-components';
import { LoadingCircle } from '..';
import { JustChildProps } from '../../types/utils';

const Dimmer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #000;
`;

const CenterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PositionedLoadingCircle = styled.div`
  margin: 0 auto 20px auto;
  display: block;
  width: 135px;
`;

export default function Loader(props: JustChildProps) {
  return (
    <Dimmer role={'loader'}>
      <CenterWrapper>
        <PositionedLoadingCircle>
          <LoadingCircle fill={'#ff0'} />
        </PositionedLoadingCircle>
        {props.children}
      </CenterWrapper>
    </Dimmer>
  );
}
