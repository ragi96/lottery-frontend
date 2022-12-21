import React, { useState } from 'react';
import { Wrapper, Heading, Text, AccountSelector, BetForm } from '../components/';
import { Container, Row, Col } from 'react-grid-system';
import { ApiContextProvider, useApi, ContractContextProvider, useContract } from '../context/';
import LotteryHeader from '../components/organisms/LotteryHeader';

function Main() {
  const [color, setColor] = useState('');
  const { api, keyring } = useApi();
  const { contract } = useContract();
  const [accountAddress, setAccountAddress] = useState('');
  if (keyring === null || api === null || contract === null) {
    return null;
  }

  if (accountAddress === '') {
    setAccountAddress(keyring.getPairs()[0].address);
    return null;
  }

  const accountPair = keyring.getPair(accountAddress);
  return (
    <Wrapper>
      <Container role={'lottery'}>
        <Row direction="row">
          <LotteryHeader accountAddress={accountAddress.toString()} />
        </Row>
        <Row direction="row">
          <Col sm={12} md={6}>
            <Heading headingLevel="h1">Pick Your Color</Heading>
            <Text text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor." />
          </Col>
          <Col sm={12} md={6}>
            <AccountSelector setAccountAddress={setAccountAddress} />
          </Col>
        </Row>
        <Row direction="row">
          <Col sm={12} md={6}>
            <BetForm accountPair={accountPair} color={color} setColor={setColor} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default function Lottery() {
  return (
    <React.Fragment>
      <ApiContextProvider>
        <ContractContextProvider>
          <Main />
        </ContractContextProvider>
      </ApiContextProvider>
    </React.Fragment>
  );
}
