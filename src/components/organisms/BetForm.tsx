import React, { useCallback, useState } from 'react';

import { useContract } from '../../context';
import { Text, Heading, Button, Colorfield, Alert, ExternalLink } from '..';
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

interface StatusMessages {
  text: string;
  txHash: string;
  type: 'success' | 'error' | 'none';
}

export default function BetForm(props: BetFormProps) {
  const { contract } = useContract();
  const { accountAddress, setColor, color } = props;
  const [status, setStatus] = useState({ text: '', txHash: '', type: 'none' } as StatusMessages);

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
    if (result.status.isInBlock) {
      if (result.events !== undefined) {
        const lastEvent = result.events[result.events.length - 1];
        if (lastEvent.event.data.method === 'ExtrinsicSuccess') {
          setStatus({
            text: `😉 Transaction included at blockHash`,
            type: 'success',
            txHash: result.status.asInBlock.toString()
          });
        } else {
          setStatus({ text: `😞 Transaction Failed: Color already filled`, type: 'error', txHash: '' });
        }
      }
    }
  };

  const handleTxError = (err: any) =>
    setStatus({ text: `😞 Transaction Failed: ${err.toString()}`, type: 'error', txHash: '' });

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
          })
          .catch((err) => handleTxError(err));
      }
    } else {
      await contract.tx
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
      <Alert type={status.type}>
        <div>
          <Text text={status.text} />
          {messageLink}
        </div>
      </Alert>
      ;
    </BetFormStyled>
  );
}
