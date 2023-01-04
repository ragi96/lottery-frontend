import React, { useState, useEffect, useCallback } from 'react';
import { Text } from '..';
import { useContract } from '../../context';
import { u32 } from '@polkadot/types';
import styled from 'styled-components';

const NextDrawStyled = styled('div')`
  display: flex;
`;

interface NextDrawProps {
  accountAddress: string;
}

export default function NextDraw(prop: NextDrawProps) {
  const { contract } = useContract();
  const [nextDrawBlock, setNextDrawBlock] = useState('');
  const { accountAddress } = prop;

  const fetchNextDraw = useCallback(async () => {
    const gasLimit = 4000000000000;
    const value = 0;
    if (contract !== null && accountAddress !== '') {
      const { result, output } = await contract.query.getNextDrawing(accountAddress, { value, gasLimit });
      if (result.isOk) {
        if (output instanceof u32) {
          setNextDrawBlock(output.toString());
        }
      }
    }
  }, [accountAddress, contract]);

  useEffect(() => {
    fetchNextDraw();
  }, [contract, accountAddress, nextDrawBlock]);

  return (
    <NextDrawStyled data-testid={'next-draw'}>
      <Text text={'Next Draw at Block: ' + nextDrawBlock.toString()} />
    </NextDrawStyled>
  );
}
