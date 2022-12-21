import { ApiPromise, Keyring } from '@polkadot/api';
import { DefinitionRpc, DefinitionRpcSub, RegistryTypes } from '@polkadot/types/types';

export enum ApiActionTypes {
  CONNECT_INIT = 'CONNECT_INIT',
  CONNECT = 'CONNECT',
  CONNECT_SUCCESS = 'CONNECT_SUCCESS',
  CONNECT_ERROR = 'CONNECT_ERROR',
  LOAD_KEYRING = 'LOAD_KEYRING',
  SET_KEYRING = 'SET_KEYRING',
  LOADED_KEYRING = 'LOADED_KEYRING',
  KEYRING_ERROR = 'KEYRING_ERROR'
}

export interface ConnectInitAction {
  type: ApiActionTypes.CONNECT_INIT;
}

export interface ConnectAction {
  type: ApiActionTypes.CONNECT;
  payload: ApiPromise;
}
export interface ConnectSuccessAction {
  type: ApiActionTypes.CONNECT_SUCCESS;
}

export interface ConnectErrorAction {
  type: ApiActionTypes.CONNECT_ERROR;
  payload: string;
}

export interface LoadKeyringAction {
  type: ApiActionTypes.LOAD_KEYRING;
}

export interface SetKeyringAction {
  type: ApiActionTypes.SET_KEYRING;
  payload: Keyring;
}

export interface LoadedKeyringAction {
  type: ApiActionTypes.LOADED_KEYRING;
  payload: Keyring;
}

export interface KeyringErrorAction {
  type: ApiActionTypes.KEYRING_ERROR;
  keyring: Keyring | null;
  keyringState: string;
}

export type ApiStateActions =
  | ConnectInitAction
  | ConnectAction
  | ConnectSuccessAction
  | ConnectErrorAction
  | LoadKeyringAction
  | LoadedKeyringAction
  | SetKeyringAction
  | KeyringErrorAction;

export interface ApiState {
  socket: string;
  jsonRpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>>;
  types: RegistryTypes;
  keyring: Keyring | null;
  keyringState: string | null;
  api: ApiPromise | null;
  apiState: string | null;
  apiError: string | null;
}
