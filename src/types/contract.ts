import { ContractPromise } from '@polkadot/api-contract';

export enum ContractActionTypes {
  CONTRACT_INIT = 'CONTRACT_INIT',
  LOAD_CONTRACT = 'LOAD_CONTRACT',
  SET_CONTRACT = 'SET_CONTRACT',
  CONTRACT_ERROR = 'CONTRACT_ERROR'
}

export interface ContractState {
  contract: ContractPromise | null;
  type: string;
  payload: ContractPromise | null;
  contractState: string | null;
}

export interface ContractInitAction {
  type: ContractActionTypes.CONTRACT_INIT;
}

export interface ContractLoadAction {
  type: ContractActionTypes.LOAD_CONTRACT;
}

export interface SetContractAction {
  type: ContractActionTypes.SET_CONTRACT;
  payload: ContractPromise;
}

export interface ContractErrorAction {
  type: ContractActionTypes.CONTRACT_ERROR;
  payload: string;
}

export type ContractStateActions = ContractInitAction | ContractLoadAction | SetContractAction | ContractErrorAction;
