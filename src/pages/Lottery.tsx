import React from 'react';
import { BlockNumber } from '../components';
import { Wrapper, Heading, Text } from '../components/';
import { Container, Row, Col } from 'react-grid-system';
import { ApiContextProvider } from '../context/ApiContext';

function Main() {
  return (
    <Wrapper>
      <Container>
        <Row direction="row">
          <Col sm={12} md={6}>
            <Heading headingLevel="h1" text="Pick Your Color" />
            <Text text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor." />
            <BlockNumber />
          </Col>
          <Col sm={12} md={6}></Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default function Lottery() {
  return (
    <React.Fragment>
      <ApiContextProvider>
        <Main />
      </ApiContextProvider>
    </React.Fragment>
  );
}
