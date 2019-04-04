import * as Immutable from 'immutable';
import { EntityActions } from './actionsOne';
import { IStateRecord, StateRecord, TStatus } from './types';




export namespace EntityReducer {
  // import Actions = EntityActions.Actions;

  export type StateRecord = Immutable.RecordOf<IStateRecord>;

  export function factoryHandlers<StatusList>() {

    const create = (action: EntityActions.IAdd, state: StateRecord): StateRecord => {
      const { request } = action;
      return new StateRecord({ data: { request }, status: { REQUEST: true } });
    }

    const setData = <S extends string>(path: string[], value: any, state: StateRecord): StateRecord => {
      return state.setIn(['data', ...path], value);

    }

    const setStatus = <S extends string>(statusNew: TStatus<S>, state: StateRecord): StateRecord => {
      return state.withMutations((state: StateRecord) => {
        Object.keys(statusNew).forEach((key: string) => state.setIn(['status', key], statusNew[key]));
      });
    }

    const load = (action: EntityActions.ILoad, state: StateRecord) => {
      return setStatus({ LOAD: true }, state);
    }

    const loadSuccess = (action: EntityActions.ILoadSuccess, state: StateRecord) => {
      const { entity } = action;
      return { ...setStatus({ LOAD_SUCCESS: true }, state), entity };
    }


    const loadError = (action: EntityActions.ILoadError, state: StateRecord) => {
      return setStatus({ LOAD_ERROR: true }, state);
    }


    return {
      setData,
      setStatus,
      create,
      load,
      loadSuccess,
      loadError
    }
  }


}


