import React, { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { useApi } from '../../context';
import styled from 'styled-components';
import { ApiPromise } from '@polkadot/api';
import Identicon from '@polkadot/react-identicon';

const DropDownContainer = styled('div')`
  right: 15px;
  background-color: #171712;
  position: absolute;
  z-index: 1;

  @media (min-width: 576px) {
    width: 100%;
    max-width: 340px;
  }
`;

const DropDownHeader = styled('div')`
  height: 30px;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  padding-top: 9px;
  padding-bottom: 4px;
  position: relative;
`;

const HeaderSpan = styled('span')`
  line-height: 1.22em;
  color: #ff3c00;
  font-size: 1.3rem;
  padding-top: 4px;
  padding-left: 38px;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
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

  color: #fff;
  border-bottom: 1px solid #fff;
  height: 32px;
  padding-left: 38px;
  padding-top: 9px;
  padding-bottom: 4px;
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ListItemIcon = styled(Identicon)`
  position: absolute;
  left: 4px;
  top: 11px;
  bottom: 0;
  margin: auto;
`;

interface AccountSelectorProps {
  setAccountAddress: Dispatch<SetStateAction<string>>;
}

interface KeyType {
  key: string;
  name: string;
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
      name: account.meta.name as string,
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

  const toggling = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onOptionClicked = (value: string) => () => {
    setAccountAddress(value);
    setAccountSelected(value);
    setIsOpen(false);
  };

  if (keyringOptions === null) {
    return null;
  }

  const selectedAccount = keyringOptions.filter((a: KeyType) => a.key === accountSelected)[0];

  if (selectedAccount === undefined) {
    return null;
  }

  return (
    <DropDownContainer data-testid={'account-selector'}>
      <DropDownHeader onClick={toggling}>
        <ListItemIcon value={selectedAccount.key} size={24} theme={'polkadot'} />
        <HeaderSpan>{selectedAccount.name}</HeaderSpan>
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {keyringOptions.map((option: KeyType) => (
              <ListItem onClick={onOptionClicked(option.key)} key={option.key}>
                <ListItemIcon value={option.key} size={24} theme={'substrate'} />
                {option.name}
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
