import React, { useState, useEffect } from 'react';
import { Wrapper, Heading, Text, AccountSelector, BetForm, Loader } from '../components/';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import { useApi, ContractContextProvider, useContract } from '../context/';
import LotteryHeader from '../components/organisms/LotteryHeader';

function Main() {
  const [color, setColor] = useState('#F0F000');
  const { api, keyring } = useApi();
  const { contract } = useContract();
  const [accountAddress, setAccountAddress] = useState('');

  useEffect(() => {
    if (keyring !== null && keyring !== undefined && keyring.getPairs().length > 0) {
      setAccountAddress(keyring.getPairs()[0].address || '');
    }
  }, [keyring, api, contract, contract]);

  if (api === null || keyring === null || keyring === undefined || accountAddress === '') {
    return (
      <Loader>
        <Text text={'Please Review Your Polkadot{.js}'} />
        <Text text={'Extensions not available on mobiles'} />
      </Loader>
    );
  }

  return (
    <Wrapper>
      <Container role={'lottery'}>
        <Hidden xs sm>
          <Row direction="row">
            <Col sm={12}>
              <LotteryHeader accountAddress={accountAddress} />
            </Col>
          </Row>
        </Hidden>
        <Row direction="row">
          <Col sm={12} md={6}>
            <Heading headingLevel="h1">Pick Your Color</Heading>
            <Text text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor." />
          </Col>
          <Col sm={12} md={6}>
            <Hidden xs>
              <AccountSelector setAccountAddress={setAccountAddress} />
            </Hidden>
          </Col>
        </Row>
        <Row direction="row">
          <Col sm={12} md={12}>
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
