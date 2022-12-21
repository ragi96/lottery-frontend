import React, { useState, useEffect } from 'react';
import { Wrapper, Heading, Text, AccountSelector, BetForm } from '../components/';
import { Container, Row, Col } from 'react-grid-system';
import { ApiContextProvider, useApi, ContractContextProvider, useContract } from '../context/';
import LotteryHeader from '../components/organisms/LotteryHeader';

function Main() {
  const [color, setColor] = useState('');
  const { api, keyring } = useApi();
  const { contract } = useContract();
  const [accountAddress, setAccountAddress] = useState('');

  useEffect(() => {
    if (keyring !== null) {
      setAccountAddress(keyring.getPairs()[0].address || '');
    }
  }, [keyring, api, contract, contract]);

  return (
    <Wrapper>
      <Container role={'lottery'}>
        <Row direction="row">
          <LotteryHeader accountAddress={accountAddress} />
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
            <BetForm accountAddress={accountAddress} color={color} setColor={setColor} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default function Lottery() {
  return (
    <React.Fragment>
      <ContractContextProvider>
        <Main />
      </ContractContextProvider>
    </React.Fragment>
  );
}
