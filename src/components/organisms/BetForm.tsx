import React, { useCallback, useState } from 'react';

import { useContract } from '../../context';
import { StatusMessages } from '../../types/utils';
import { Text, Heading, Button, Colorfield, Alert } from '..';
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
    height: 150px;
    cursor: pointer;
  }

  @media (min-width: 1280px) {
    &.react-colorful {
      height: 200px;
    }
  }
`;

const StyledLink = styled.a`
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;

interface BetFormProps {
  accountAddress: string;
  color: string;
  setColor: (color: string) => void;
}

export default function BetForm(props: BetFormProps) {
  const { contract } = useContract();
  const { accountAddress, setColor, color } = props;
  const [status, setStatus] = useState({ text: '', txHash: '', type: 'none' } as StatusMessages);

  const createUInt8Array = (): Uint8Array => {
    const colorArray = new Uint8Array(32);
    for (let i = 0; i < 3; i++) {
      let countAdjust = i;
      if (i !== 0) {
        countAdjust = i * 2;
      }
      const colorHex = hexAddPrefix(color.substring(1 + countAdjust, 3 + countAdjust));
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
    if (result.status.isInBlock) {
      if (result.events !== undefined) {
        const lastEvent = result.events[result.events.length - 1];
        if (lastEvent.event.data.method === 'ExtrinsicSuccess') {
          setStatus({
            text: `Good Luck, Transaction included in a block!`,
            type: 'success',
            txHash: result.status.asInBlock.toString()
          });
        } else {
          setStatus({ text: `Sorry the transaction failed: color already filled`, type: 'error', txHash: '' });
        }
      }
    }
  };

  const handleTxError = (err: Error) => {
    if (err.message === 'ExtrinsicFailed: Other("InsufficientBalance")') {
      setStatus({ text: `Sorry the transaction failed: your account balance is too low`, type: 'error', txHash: '' });
    } else if (err.message === 'ExtrinsicFailed: Other("InsufficientGasLimit")') {
      setStatus({ text: `Sorry the transaction failed: gas limit is too low`, type: 'error', txHash: '' });
    } else if (err.message === 'Cancelled') {
      setStatus({ text: `Sorry the transaction failed: you cancelled the transaction`, type: 'warning', txHash: '' });
    } else {
      setStatus({ text: `Sorry the transaction failed: ${err.message}`, type: 'error', txHash: '' });
    }
  };

  const sendTx = async function (accountPair: KeyringPair, contract: ContractPromise) {
    const value = 1000000;
    const storageDepositLimit = null;
    const colorArray = createUInt8Array();
    const gasLimit = (await getGasLimit(colorArray, contract, accountPair)).toFixed();
    setStatus({ text: `Signing the transaction...`, type: 'warning', txHash: '' });
    if (accountPair.isLocked) {
      const signer = await getInjector(accountPair);
      if (signer !== null) {
        contract.tx
          .registerBet({ storageDepositLimit, gasLimit, value }, colorArray)
          .signAndSend(accountPair.address, { signer: signer }, (result) => {
            handleTxResult(result);
          })
          .catch((err: Error) => handleTxError(err));
      }
    } else {
      await contract.tx
        .registerBet({ storageDepositLimit, gasLimit, value }, colorArray)
        .signAndSend(accountPair, (result) => {
          handleTxResult(result);
        })
        .catch((err: Error) => handleTxError(err));
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

  let messageLink;
  if (status.txHash !== '') {
    messageLink = (
      <StyledLink
        target={'_blank'}
        href={
          'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fsubstrate.ragilab.science#/explorer/query/' + status.txHash
        }
      >
        Check In The Explorer
      </StyledLink>
    );
  }

  return (
    <BetFormStyled role={'bet-form'}>
      <Row>
        <Col xs={12}>
          <Heading headingLevel="h2">Use the color picker</Heading>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <HexColorPickerStyled color={color} onChange={setColor} />
        </Col>
        <Col md={6}>
          <Colorfield color={color} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Text text={'Your Pick in Hex: ' + color} />
        </Col>
        <Col xs={12}>
          <Button label={'Submit Bet'} primary={false} onClick={submit} />
        </Col>
      </Row>
      <Alert type={status.type} setStatus={setStatus}>
        <div>
          <Text text={status.text} />
          {messageLink}
        </div>
      </Alert>
    </BetFormStyled>
  );
}
