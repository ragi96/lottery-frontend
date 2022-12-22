import React, { useCallback } from 'react';
import { KeyringPair } from '@polkadot/keyring/types';
import { useContract } from '../../context';
import { Text, Button } from '..';
import styled from 'styled-components';
import { hexToU8a, hexAddPrefix } from '@polkadot/util';
import { ContractPromise } from '@polkadot/api-contract';
import { web3FromSource } from '@polkadot/extension-dapp';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import keyring from '@polkadot/ui-keyring';

const BetFormStyled = styled('div')`
  height: 20px;
  font-size: 1.3rem;
`;

interface BetFormProps {
  accountAddress: string;
  color: string;
  setColor: (color: string) => void;
}

export default function BetForm(props: BetFormProps) {
  const { contract } = useContract();
  const { accountAddress, setColor, color } = props;

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

  const handleTxResult = (result: any) => {
    console.log(result);
  };

  const sendTx = async function (accountPair: KeyringPair, contract: ContractPromise) {
    const value = 1000000;
    const storageDepositLimit = null;
    const colorArray = createUInt8Array();
    const gasLimit = (await getGasLimit(colorArray, contract, accountPair)).toFixed();

    if (accountPair.isLocked) {
      const signer = await getInjector(accountPair);
      if (signer !== null) {
        contract.tx
          .registerBet({ storageDepositLimit, gasLimit, value }, colorArray)
          .signAndSend(accountPair.address, { signer: signer }, (result) => {
            handleTxResult(result);
          });
      }
    } else {
      contract.tx
        .registerBet({ storageDepositLimit, gasLimit, value }, colorArray)
        .signAndSend(accountPair, (result) => {
          handleTxResult(result);
        });
    }
  };

  const submit = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (contract === null || accountAddress === '' || color === '') {
        return;
      }
      sendTx(keyring.getPair(accountAddress), contract);
    },
    [color, accountAddress, contract]
  );

  return (
    <BetFormStyled role={'bet-form'}>
      <Text text={'Your Color: '} />
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} />
      <Button label={'Submit Bet'} primary={false} onClick={submit} />
    </BetFormStyled>
  );
}
