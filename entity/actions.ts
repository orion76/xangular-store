import { Action } from '@ngrx/store';
import { IEntityRequest } from '@xangular-store/entity/types';
import { IEntity } from '@app-library/entity/types';

export interface IAction extends Action {
  stateId?: string;
}


export namespace EntityActions {
  export enum EActions {
    REQUEST = '[ENTITY] REQUEST',
    LOAD = '[ENTITY] LOAD',
    LOAD_SUCCESS = '[ENTITY] LOAD_SUCCESS',
    LOAD_ERROR = '[ENTITY] LOAD_ERROR',
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
    request: IEntityRequest;
  }

  export interface ISetParent extends IAction {
    parent: IEntity;
  }
}

