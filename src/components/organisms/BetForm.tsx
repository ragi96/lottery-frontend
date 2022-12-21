import React from 'react';
import { KeyringPair } from '@polkadot/keyring/types';
import { useContract } from '../../context';
import { Text } from '..';
import styled from 'styled-components';
import { hexToU8a, hexAddPrefix } from '@polkadot/util';
import { ContractPromise } from '@polkadot/api-contract';
import { web3FromSource } from '@polkadot/extension-dapp';

const BetFormStyled = styled('div')`
  width: 120px;
  height: 20px;
  font-size: 1.3rem;
`;

interface BetFormProps {
  accountPair: KeyringPair;
  color: string;
  setColor: (color: string) => void;
}

export default function BetForm(props: BetFormProps) {
  const { contract } = useContract();
  const { accountPair, setColor, color } = props;
  const setInput = function (e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  };

  const createUInt8Array = (): Uint8Array => {
    const colorArray = new Uint8Array(32);
    for (let i = 0; i < 3; i++) {
      const colorHex = hexAddPrefix(color.substring(1 + i, 3 + i));
      colorArray[i] = hexToU8a(colorHex)[0];
    }
    return colorArray;
  };

  const getGasLimit = async function (colorArray: Uint8Array, contract: ContractPromise, accountPair: KeyringPair) {
    const value = 1000000;
    const storageDepositLimit = null;
    const { gasRequired } = await contract.query.registerBet(
      accountPair.address,
      { value, gasLimit: -1, storageDepositLimit },
      colorArray
    );
    return gasRequired.toNumber();
  };

  const getInjector = async (accountPair: KeyringPair) => {
    const injector = await web3FromSource(accountPair.meta.source as string);
    return injector.signer;
  };

  const sendTx = async function (accountPair: KeyringPair, contract: ContractPromise) {
    const signer = await getInjector(accountPair);
    const value = 1000000;
    const storageDepositLimit = null;
    const colorArray = createUInt8Array();
    const gasLimit = (await getGasLimit(colorArray, contract, accountPair)).toFixed();

    if (signer !== null) {
      contract.tx
        .registerBet({ storageDepositLimit, gasLimit, value }, colorArray)
        .signAndSend(accountPair.address, { signer: signer }, (result) => {
          console.log(result);
        });
    }
  };

  const submit = async function (e: any) {
    e.preventDefault();
    if (contract === null || accountPair === null || color === '') {
      return;
    }
    sendTx(accountPair, contract);
  };

  return (
    <BetFormStyled role={'bet-form'}>
      <Text text={'Your Color: '} />
      <input type="color" onChange={setInput} />
      <button onClick={submit}>Bet</button>
    </BetFormStyled>
  );
}
