import React, { useState, useCallback, useEffect } from 'react';
import { Text } from '..';
import { useContract } from '../../context';
import { u128 } from '@polkadot/types';
import { KeyringPair } from '@polkadot/keyring/types';
import styled from 'styled-components';

const JackpotWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -100px;
  left: 50%;
  z-index: 1;
`;

interface JackpotProps {
  accountPair: KeyringPair | null | false | '';
}

export default function Jackpot(props: JackpotProps) {
  const { contract } = useContract();
  const [jackpot, setJackpot] = useState('');
  const [jackpotTimer, setJackpotTimer] = useState(0);
  const { accountPair } = props;

  const fetchJackpot = useCallback(async () => {
    const gasLimit = 4000000000000;
    const value = 0;
    if (accountPair !== null && contract !== null && accountPair !== false && accountPair !== '') {
      const { result, output } = await contract.query.getJackpot(accountPair.address, { value, gasLimit });
      if (result.isOk) {
        if (output instanceof u128) {
          setJackpot(output.toString());
        }
      }
    }
  }, [accountPair, contract]);

  const timer = () => {
    setJackpotTimer((time) => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetchJackpot();
  }, [contract, accountPair, jackpotTimer]);

  return (
    <JackpotWrapper role={'jackpot'}>
      <Text text={'Jackpot: ' + jackpot} />
    </JackpotWrapper>
  );
}
