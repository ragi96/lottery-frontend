import styled from 'styled-components';
import { BlockNumber, Jackpot, NextDraw } from '../';
import { KeyringPair } from '@polkadot/keyring/types';

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
  accountPair: KeyringPair | '';
}

export default function LotteryHeader(props: KeyringProps) {
  const { accountPair } = props;
  return (
    <HeaderWrapper role={'lottery-header'}>
      <FlexWrapper>
        <BlockNumber />
        <Jackpot accountPair={accountPair} />
        <NextDraw accountPair={accountPair} />
      </FlexWrapper>
    </HeaderWrapper>
  );
}
