import React, { useReducer, useContext } from 'react';
import { Reducer } from 'redux';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import queryString from 'query-string';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';
import { ApiActionTypes, ApiStateActions, ApiState } from '../redux/actiontypes/api';

import config from '../config';
import { KeyringInstance } from '@polkadot/keyring/types';

const parsedQuery = queryString.parse(window.location.search);
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);

export interface ApiContextType {
  api: ApiPromise | null;
  apiState: string | null;
  apiError: string | null;
  keyring: KeyringInstance | null;
  keyringState: string | null;
}

export interface ApiContextProviderProps {
  children?: React.ReactElement;
}

const initialState: ApiState = {
  socket: connectedSocket,
  jsonRpc: { ...jsonrpc, ...config.RPC },
  types: config.types,
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null
};
const reducer: Reducer<ApiState> = (state = initialState, action: ApiStateActions) => {
  switch (action.type) {
    case ApiActionTypes.CONNECT_INIT:
      return { ...state, apiState: 'CONNECTING' };

    case ApiActionTypes.CONNECT:
      return { ...state, api: action.payload, apiState: 'CONNECTING' };

    case ApiActionTypes.CONNECT_SUCCESS:
      return { ...state, apiState: 'READY' };

    case ApiActionTypes.CONNECT_ERROR:
      return { ...state, apiState: 'ERROR', apiError: action.payload };

    case ApiActionTypes.LOAD_KEYRING:
      return { ...state, keyringState: 'LOADING' };

    case ApiActionTypes.SET_KEYRING:
      return { ...state, keyring: action.payload, keyringState: 'READY' };

    case ApiActionTypes.LOADED_KEYRING:
      return { ...state, keyring: action.payload, keyringState: 'LOADED' };

    case ApiActionTypes.KEYRING_ERROR:
      return { ...state, keyring: null, keyringState: 'ERROR' };

    default:
      throw new Error(`Unknown type`);
  }
};

let loadAccts = false;
const loadAccounts = (state: ApiState, dispatch: any) => {
  const asyncLoadAccounts = async () => {
    dispatch({ type: ApiActionTypes.LOAD_KEYRING });
    try {
      await web3Enable(config.APP_NAME);
      let allAccounts = await web3Accounts();
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` }
      }));
      keyring.loadAll({ isDevelopment: config.DEVELOPMENT_KEYRING }, allAccounts);
      loadAccts = true;
      dispatch({ type: ApiActionTypes.LOADED_KEYRING, payload: keyring });
    } catch (e) {
      console.log(e);
      dispatch({ type: ApiActionTypes.LOADED_KEYRING, payload: keyring });
    }
  };
  const { keyringState } = state;
  // If `keyringState` is not null `asyncLoadAccounts` is running.
  if (keyringState) return;
  // If `loadAccts` is true, the `asyncLoadAccounts` has been run once.
  if (loadAccts) {
    return dispatch({ type: ApiActionTypes.LOADED_KEYRING, payload: keyring });
  }
  asyncLoadAccounts();
};

const connect = (state: ApiState, dispatch: any) => {
  const { apiState, socket, jsonRpc, types } = state;
  // We only want this function to be performed once
  if (apiState) return;

  dispatch({ type: ApiActionTypes.CONNECT_INIT });

  const provider = new WsProvider(socket);
  const _api = new ApiPromise({ provider, types, rpc: jsonRpc });

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: ApiActionTypes.CONNECT, payload: _api });
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(() => dispatch({ type: ApiActionTypes.CONNECT_SUCCESS }));
  });
  _api.on('ready', () => {
    dispatch({ type: ApiActionTypes.CONNECT_SUCCESS });
  });
  _api.on('error', (err) => dispatch({ type: ApiActionTypes.CONNECT_ERROR, payload: err }));
};

export const ApiContext: React.Context<ApiContextType> = React.createContext({} as ApiContextType);

const ApiContextProvider = (props: ApiContextProviderProps) => {
  // filtering props and merge with default param value
  const initState = { ...initialState };

  const [state, dispatch] = useReducer(reducer, initState);
  connect(state, dispatch);
  loadAccounts(state, dispatch);

  return <ApiContext.Provider value={state}>{props.children}</ApiContext.Provider>;
};

const useApi = () => ({ ...useContext(ApiContext) });

export { ApiContextProvider, useApi };
