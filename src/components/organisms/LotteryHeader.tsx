import styled from 'styled-components';
import { BlockNumber, Jackpot, NextDraw } from '../';

const HeaderWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: -100px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

interface KeyringProps {
  accountAddress: string;
}

export default function LotteryHeader(props: KeyringProps) {
  const { accountAddress } = props;
  return (
    <HeaderWrapper role={'lottery-header'}>
      <FlexWrapper role={'flex-lottery-header'}>
        <BlockNumber />
        <Jackpot accountAddress={accountAddress} />
        <NextDraw accountAddress={accountAddress} />
      </FlexWrapper>
    </HeaderWrapper>
  );
}
