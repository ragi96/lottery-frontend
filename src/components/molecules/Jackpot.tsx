import React, { useState, useCallback, useEffect } from 'react';
import { Text } from '..';
import { useContract } from '../../context';
import { u128 } from '@polkadot/types';
import styled from 'styled-components';

import config from '../../config';

const JackpotWrapper = styled('div')`
  display: flex;
`;

interface JackpotProps {
  accountAddress: string;
}

export default function Jackpot(props: JackpotProps) {
  const { contract } = useContract();
  const [jackpot, setJackpot] = useState('');
  const [jackpotTimer, setJackpotTimer] = useState(0);
  const { accountAddress } = props;

  const fetchJackpot = useCallback(async () => {
    const gasLimit = 4000000000000;
    const value = 0;

    if (contract !== null && accountAddress !== '') {
      const { result, output } = await contract.query.getJackpot(accountAddress, { value, gasLimit });
      if (result.isOk) {
        if (output instanceof u128) {
          const jackpotValue = output.toNumber() / 1000000;
          setJackpot(jackpotValue.toString());
        }
      }
    }
  }, [accountAddress, contract]);

  const timer = () => {
    setJackpotTimer((time) => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [jackpotTimer]);

  useEffect(() => {
    fetchJackpot();
  }, [contract, accountAddress, jackpotTimer]);

  return (
    <JackpotWrapper role={'jackpot'}>
      <Text text={'Jackpot: ' + jackpot + ' micro ' + config.CURRENCY} />
    </JackpotWrapper>
  );
}
