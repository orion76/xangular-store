import {IEntity} from "@libcomm/common/entity/interfaces";
import {EntityStoreSelectors} from "./selectors";


export namespace EntityStoreTypes {


  import IEntitySelectors = EntityStoreSelectors.IEntitySelectors;

  export interface IState {
    stateId: string,
    request?: any,
    entity?: any,
    status?: any
  }

  export interface IEntityState extends IState {
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


  export type TStatusName = keyof IEntityStatus;
  export type TSelectorNames = keyof IEntitySelectors<IEntityState, TStatusName>;
  export type TSelectors = IEntitySelectors<IEntityState, TStatusName>[TSelectorNames];

  export interface IStateProps {
    stateId: string,

  }

  export interface IFieldProps extends IStateProps {
    path?: string[]
  }

  export interface IStatusProps extends IStateProps {
    status: string;
    value: any
  }


}

