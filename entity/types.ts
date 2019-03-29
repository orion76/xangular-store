import { IEntity } from '@app-library/entity/types';



export interface IState {
  stateId: string,

}

export interface IStateEntity extends IState {
  request?: IEntityRequest,
  entity?: IEntity,
  status?: IEntityStatus
}

export interface IEntityRequest {
  entityId: string;
  source: string;
}

export interface IEntityStatus {
  REQUEST?: boolean,
  LOAD?: boolean,
  LOAD_SUCCESS?: boolean,
  LOAD_ERROR?: boolean,
}

export interface IStateProps {
  stateId?: string,
}

export interface IStatusProps extends IStateProps {
  status: string,
  value: boolean
}



// export interface IStatusProps extends IStateProps {
//   status: string;
//   value: any
// }




