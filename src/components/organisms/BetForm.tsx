import React from 'react';
import { KeyringPair } from '@polkadot/keyring/types';
import { useContract } from '../../context';
import { Text } from '..';
import styled from 'styled-components';
import { hexToU8a, hexAddPrefix } from '@polkadot/util';

const BetFormStyled = styled('div')`
  width: 120px;
  height: 20px;
  font-size: 1.3rem;
`;

interface BetFormProps {
  accountPair: KeyringPair | null | '';
  color: string;
  setColor: (color: string) => void;
}

export default function BetForm(props: BetFormProps) {
  const { contract } = useContract();
  const { accountPair, setColor, color } = props;

  const setInput = function (e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  };

  const submit = async function (e: any) {
    e.preventDefault();
    if (contract === null || accountPair === null || accountPair === '' || color === '') {
      return;
    }
    const value = 1000000;
    let gasLimit = -1;
    const storageDepositLimit = null;

    const colorArray = new Uint8Array(32);
    for (let i = 0; i < 3; i++) {
      const colorHex = hexAddPrefix(color.substring(1 + i, 3 + i));
      colorArray[i] = hexToU8a(colorHex)[0];
    }
    const { gasRequired } = await contract.query.registerBet(
      accountPair.address,
      { value, gasLimit, storageDepositLimit },
      colorArray
    );

    gasLimit = gasRequired.toNumber();
    await contract.tx
      .registerBet({ storageDepositLimit, gasLimit, value }, colorArray)
      .signAndSend(accountPair, (result) => {
        console.log(result);
      });
  };

  return (
    <BetFormStyled role={'bet-form'}>
      <Text text={'Your Color: '} />
      <input type="color" onChange={setInput} />
      <button onClick={submit}>Bet</button>
    </BetFormStyled>
  );
}
