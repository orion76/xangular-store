import {Action} from '@ngrx/store';

import {IEntity} from "@libcomm/common/entity/interfaces";
import {EntityStoreTypes} from "./types";
import IEntityRequest = EntityStoreTypes.IEntityRequest;


export enum EntityActions {
  REQUEST = '[ENTITY] REQUEST',
  LOAD = '[ENTITY] LOAD',
  LOAD_SUCCESS = '[ENTITY] LOAD_SUCCESS',
  LOAD_ERROR = '[ENTITY] LOAD_ERROR',
}


export interface IAction extends Action {
  stateId?: string;
}

export interface IRequest extends IAction {
  request: IEntityRequest;
}

export interface ILoad extends IAction {
  request: IEntityRequest;
}

export interface ILoadSuccess extends IAction {
  entity: IEntity;
}

export interface ILoadError extends IAction {
}


export type TActions = IRequest | ILoad | ILoadSuccess | ILoadError
