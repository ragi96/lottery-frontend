import React, { useReducer, useContext } from 'react';
import { Reducer } from 'redux';
import queryString from 'query-string';

import { useApi } from './ApiContext';

import { ContractPromise } from '@polkadot/api-contract';
import { ApiPromise } from '@polkadot/api';

import { ContractActionTypes, ContractState, ContractStateActions } from '../redux/actiontypes/contract';

import config from '../config';

const parsedQuery = queryString.parse(window.location.search);
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);

const initialState: ContractState = {
  type: ContractActionTypes.CONTRACT_INIT,
  payload: null,
  contractState: null,
  contract: null
};

const reducer: Reducer<ContractState> = (state = initialState, action: ContractStateActions) => {
  switch (action.type) {
    case ContractActionTypes.LOAD_CONTRACT:
      return { ...state, contractState: 'LOADING' };

    case ContractActionTypes.SET_CONTRACT:
      return { ...state, contract: action.payload, contractState: 'READY' };

    case ContractActionTypes.CONTRACT_ERROR:
      return { ...state, contract: null, contractState: ContractActionTypes.CONTRACT_ERROR };

    default:
      throw new Error(`Unknown type Contract`);
  }
};

import ABI from '../context/abi.json';

const loadContract = (state: ContractState, dispatch: any, api: ApiPromise) => {
  const { contractState } = state;
  if (api) {
    if (contractState) return;
    dispatch({ type: ContractActionTypes.LOAD_CONTRACT });
    try {
      const _contract = new ContractPromise(api, ABI, config.CONTRACT_ADDRESS);
      dispatch({ type: ContractActionTypes.SET_CONTRACT, payload: _contract });
    } catch (e) {
      dispatch({ type: ContractActionTypes.CONTRACT_ERROR });
    }
  }
};

export interface ContractContextType {
  contractState: string | null;
  contract: ContractPromise | null;
}

export interface ContractContextProviderProps {
  children?: React.ReactElement;
}

export const ContractContext: React.Context<ContractContextType> = React.createContext({} as ContractContextType);

const ContractContextProvider = (props: ContractContextProviderProps) => {
  const initState = { ...initialState };
  const { apiState, api } = useApi();
  const [state, dispatch] = useReducer(reducer, initState);

  if (apiState === 'READY' && api) {
    loadContract(state, dispatch, api);
  }

  return <ContractContext.Provider value={state}>{props.children}</ContractContext.Provider>;
};

const useContract = () => ({ ...useContext(ContractContext) });

export { ContractContextProvider, useContract };
