import React, { useState, useEffect } from 'react';
import { Wrapper, Heading, Text, AccountSelector, BetForm, Loader } from '../components/';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import { useApi, ContractContextProvider, useContract } from '../context/';
import LotteryHeader from '../components/organisms/LotteryHeader';
import styled from 'styled-components';
import config from '../config';

const StyledLottery = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  margin: 0 auto;
`;

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
    <StyledLottery>
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
              <Text text={'Price per Ticket: 1 micro ' + config.CURRENCY} />
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
    </StyledLottery>
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
