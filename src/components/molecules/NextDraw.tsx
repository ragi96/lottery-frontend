import { useState, useEffect, useCallback } from 'react';
import { Text } from '..';
import { useContract } from '../../context';
import { KeyringPair } from '@polkadot/keyring/types';
import { u32 } from '@polkadot/types';
import styled from 'styled-components';

const NextDrawStyled = styled('div')`
  display: flex;
`;

interface NextDrawProps {
  accountPair: KeyringPair | null | false | '';
}

export default function NextDraw(prop: NextDrawProps) {
  const { contract } = useContract();
  const [nextDrawBlock, setNextDrawBlock] = useState('');
  const { accountPair } = prop;

  const fetchNextDraw = useCallback(async () => {
    const gasLimit = 4000000000000;
    const value = 0;
    if (accountPair !== null && contract !== null && accountPair !== false && accountPair !== '') {
      const { result, output } = await contract.query.getNextDrawing(accountPair.address, { value, gasLimit });
      if (result.isOk) {
        if (output instanceof u32) {
          setNextDrawBlock(output.toString());
        }
      }
    }
  }, [accountPair, contract]);

  useEffect(() => {
    fetchNextDraw();
  }, [contract, accountPair, nextDrawBlock]);

  return (
    <NextDrawStyled role={'next-draw'}>
      <Text text={'Next Draw at Block: ' + nextDrawBlock.toString()} />
    </NextDrawStyled>
  );
}
