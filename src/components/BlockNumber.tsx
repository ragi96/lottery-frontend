import { useState, useContext } from 'react';
import { Text } from './';
import { ApiContext } from '../context/';

export default function BlockNumber() {
  const { api, apiReady } = useContext(ApiContext);
  const [blockNumber, setBlockNumber] = useState(0);
  api?.isReady.then(() => {
    api?.rpc.chain.subscribeNewHeads((header) => {
      setBlockNumber(header.number.toNumber());
    });
  });

  if (apiReady === false) {
    return <Text text="Loading..." />;
  }
  return <Text text={blockNumber.toString()} />;
}
