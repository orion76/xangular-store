import { IEntity } from '@xangular-common/entity/types';
import * as Immutable from 'immutable';




export interface IStateCount {
  list: Immutable.Set<string>,
  changed: Immutable.Set<string>,
  handled: Immutable.Set<string>,
}



export type TStatus<Statuses extends string> = { [K in Statuses]?: boolean }


export type TEntityStatusList = 'REQUEST' | 'LOAD' | 'LOAD_SUCCESS' | 'LOAD_ERROR';
export type TEntityStatus = TStatus<TEntityStatusList>;


export interface IEntityStates {
  request: IEntityRequest,
  entity?: IEntity
}


export interface IStateRecord {
  stateId: string,
  data: any,
  status: { [K: string]: boolean },
  counts: { [K: string]: IStateCount }
}

export interface IState<DataType> {
  stateId: string,
  data: Partial<DataType>,
  status: { [K: string]: boolean },
  counts: { [K in keyof DataType]?: IStateCount }
}

export const StateRecord = Immutable.Record<IStateRecord>({ stateId: null, data: {}, counts: {}, status: {} })

export interface IStateEntity extends IState<IEntityStates> {

}

export interface IEntityRequest {
  entityId: string;
  source: string;
}

export interface IStateProps {
  stateId?: string,
}

export interface IStatusProps extends IStateProps {
  status: { [name: string]: boolean }
}



// export interface IStatusProps extends IStateProps {
//   status: string;
//   value: any
// }




