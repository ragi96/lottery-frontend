import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useApi } from '../context/';
import styled from 'styled-components';
import { ApiPromise } from '@polkadot/api';

const DropDownContainer = styled('div')`
  width: 100%;
`;

const DropDownHeader = styled('div')`
  font-size: 20px;
  height: 30px;
  line-height: 1.22;
  color: #ff3c00;
  padding-top: 15px;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
`;

const DropDownListContainer = styled('div')``;

const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 1.3rem;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
`;

const ListItem = styled('li')`
  list-style: none;
  padding-left: 38px;
  color: #fff;
  border-bottom: 1px solid #fff;
  height: 32px;
  padding-top: 13px;
`;

interface AccountSelectorProps {
  setAccountAddress: Dispatch<SetStateAction<string>>;
}

interface KeyType {
  key: string;
  value: string;
  icon: string;
}

function Main(props: AccountSelectorProps) {
  const { keyring } = useApi();
  const { setAccountAddress } = props;
  const [accountSelected, setAccountSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  let initialAddress = '';
  let keyringOptions: KeyType[] | null = null;
  if (keyring !== null) {
    keyringOptions = keyring.getPairs().map((account) => ({
      key: account.address,
      value: account.address,
      icon: 'user'
    }));
    initialAddress = keyringOptions.length > 0 ? keyringOptions[0].key : '';
  }

  useEffect(() => {
    if (initialAddress !== '') {
      setAccountAddress(initialAddress);
      setAccountSelected(initialAddress);
    }
  }, [setAccountAddress, initialAddress]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setAccountAddress(value);
    setAccountSelected(value);
    setIsOpen(false);
  };

  if (keyringOptions === null) {
    return null;
  }

  const selectedAccount = keyringOptions.filter((a: KeyType) => a.value === accountSelected)[0];

  if (selectedAccount === undefined) {
    return null;
  }

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>{selectedAccount.value}</DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {keyringOptions.map((option: KeyType) => (
              <ListItem onClick={onOptionClicked(option.key)} key={Math.random()}>
                {option.value}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

export default function AccountSelector(props: AccountSelectorProps) {
  const { api, keyring, keyringState } = useApi();
  if (api instanceof ApiPromise) {
    if (keyring !== null && keyringState === 'LOADED') {
      return <Main {...props} />;
    }
  }
  return null;
}
