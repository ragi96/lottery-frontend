import React, { useCallback } from 'react';

import { useContract } from '../../context';
import { Text, Heading, Button, Colorfield } from '..';
import styled from 'styled-components';
import { Row, Col } from 'react-grid-system';
import { HexColorPicker } from 'react-colorful';
import { ContractPromise } from '@polkadot/api-contract';
import { web3FromSource } from '@polkadot/extension-dapp';
import { KeyringPair } from '@polkadot/keyring/types';
import keyring from '@polkadot/ui-keyring';
import { hexToU8a, hexAddPrefix } from '@polkadot/util';
import { ISubmittableResult } from '@polkadot/types/types';

const BetFormStyled = styled('div')`
  width: 100%;
  font-size: 1.3rem;
`;

const HexColorPickerStyled = styled(HexColorPicker)`
  &.react-colorful {
    width: 100%;
    cursor: pointer;
  }
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

  const handleTxResult = (result: ISubmittableResult) => {
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
      <Row>
        <Col xs={12}>
          <Heading headingLevel="h2">Use the color picker</Heading>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <HexColorPickerStyled color={color} onChange={setColor} />
        </Col>
        <Col xs={6}>
          <Colorfield color={color} />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Text text={'Your Pick in Hex: ' + color} />
        </Col>
      </Row>

      <Row>
        <Button label={'Submit Bet'} primary={false} onClick={submit} />
      </Row>
    </BetFormStyled>
  );
}
