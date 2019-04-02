import { IEntity } from '@xangular-common/entity/types';
import * as Immutable from 'immutable';




export interface IStateCount {
  list: Immutable.Set<string>,
  changed: Immutable.Set<string>,
  handled: Immutable.Set<string>,
}

export interface IEntityStatus {
  REQUEST?: boolean,
  LOAD?: boolean,
  LOAD_SUCCESS?: boolean,
  LOAD_ERROR?: boolean,
}

export interface IEntityStates {
  request: IEntityRequest,
  entity?: IEntity
}



export interface IState<DataType, StatusType> {
  stateId: string,
  data: DataType,
  status: { [K in keyof StatusType]?: boolean },
  counts: { [K in keyof DataType]?: IStateCount }
}

export interface IStateEntity extends IState<IEntityStates, IEntityStatus> {

}

export interface IEntityRequest {
  entityId: string;
  source: string;
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




