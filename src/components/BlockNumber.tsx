import { useState, useEffect } from 'react';
import { Text } from '.';
import { useApi } from '../context';

export default function BlockNumber() {
  const { api } = useApi();
  const [blockNumber, setBlockNumber] = useState(0);
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);

  useEffect(() => {
    if (api !== null && api !== undefined) {
      api.rpc.chain.subscribeNewHeads((header) => {
        setBlockNumber(header.number.toNumber());
      });
    }
  }, [api]);

  const timer = () => {
    setBlockNumberTimer((time) => time + 1);
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  return <Text text={blockNumber.toString()} />;
}
