import { Action } from '@ngrx/store';
import { IEntityRequest } from './types';
import { IEntity } from '@xangular-common/entity/types';

export interface IAction extends Action {
  stateId?: string;
}


export namespace EntityActions {
  export enum EActions {
    REQUEST = '[ENTITY ONE] REQUEST',
    LOAD = '[ENTITY ONE] LOAD',
    LOAD_SUCCESS = '[ENTITY ONE] LOAD_SUCCESS',
    LOAD_ERROR = '[ENTITY ONE] LOAD_ERROR',
  }
  export interface IRequest extends Action {
    request: IEntityRequest;
  }

  export interface ILoad extends Action {
    request: IEntityRequest;
  }

  export interface ILoadSuccess extends Action {
    entity: IEntity;
  }

  export interface ILoadError extends Action {
    request: IEntityRequest;
  }

  export interface ISetParent extends Action {
    parent: IEntity;
  }
}

