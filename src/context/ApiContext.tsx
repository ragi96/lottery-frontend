import React, { useReducer, useContext, useEffect } from 'react';
import { Reducer } from 'redux';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import keyring from '@polkadot/ui-keyring';
import { ApiActionTypes, ApiStateActions, ApiState } from '../types/api';
import { AnyAction } from '@reduxjs/toolkit';

import config from '../config';

export interface ApiContextType {
  api: ApiPromise | null;
  apiState: string | null;
  apiError: string | null;
  keyring: Keyring | null;
  keyringState: string | null;
}

export interface ApiContextProviderProps {
  children?: React.ReactElement;
}

const initialState: ApiState = {
  socket: config.PROVIDER_SOCKET,
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

const loadAccounts = (state: ApiState, dispatch: React.Dispatch<AnyAction>) => {
  dispatch({ type: ApiActionTypes.LOAD_KEYRING });
  const asyncLoadAccounts = async () => {
    try {
      await web3Enable(config.APP_NAME);
      let allAccounts = await web3Accounts();
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` }
      }));
      keyring.loadAll({ isDevelopment: config.DEVELOPMENT_KEYRING }, allAccounts);
      dispatch({ type: ApiActionTypes.LOADED_KEYRING, payload: keyring });
    } catch (e) {
      console.log(e);
      dispatch({ type: ApiActionTypes.LOADED_KEYRING, payload: keyring });
    }
  };
  asyncLoadAccounts();
};

const connect = (state: ApiState, dispatch: React.Dispatch<AnyAction>) => {
  const { apiState, socket, jsonRpc, types } = state;
  if (apiState) return;

  dispatch({ type: ApiActionTypes.CONNECT_INIT });

  const provider = new WsProvider(socket);
  const _api = new ApiPromise({ provider, types, rpc: jsonRpc });

  _api.on('connected', () => {
    dispatch({ type: ApiActionTypes.CONNECT, payload: _api });
    _api.isReady.then(() => dispatch({ type: ApiActionTypes.CONNECT_SUCCESS }));
  });
  _api.on('ready', () => {
    dispatch({ type: ApiActionTypes.CONNECT_SUCCESS });
  });
  _api.on('error', (err) => dispatch({ type: ApiActionTypes.CONNECT_ERROR, payload: err }));
};

export const ApiContext: React.Context<ApiContextType> = React.createContext({} as ApiContextType);

let keyringLoadAll = false;

const ApiContextProvider = (props: ApiContextProviderProps) => {
  const initState = { ...initialState };

  const [state, dispatch] = useReducer(reducer, initState);
  connect(state, dispatch);
  useEffect(() => {
    const { apiState, keyringState } = state;
    if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true;
      loadAccounts(state, dispatch);
    }
  }, [state, dispatch]);

  return <ApiContext.Provider value={state}>{props.children}</ApiContext.Provider>;
};

const useApi = () => useContext(ApiContext);

export { ApiContextProvider, useApi };
