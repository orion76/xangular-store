import { EntityAdapter, EntityState } from '@ngrx/entity';
import { EntityActions } from './actionsOne';
import { IStateEntity, IState, IEntityStates, IEntityStatus } from './types';


type StateType = Partial<IStateEntity>;
type StatusType = Partial<IEntityStatus>;

export namespace EntityReducer {
  // import Actions = EntityActions.Actions;

  export function factoryHandlers() {

    const addRequest = (action: EntityActions.IRequest, state: StateType) => {
      const { request } = action;
      const stateNew: StateType = { stateId: null, data: { request } };
      return setStatus({ REQUEST: true }, stateNew)
    }

    const setStatus = (statusNew: StatusType, state: StateType) => {
      const status = { ...state.status, ...(statusNew as Object) }
      return { ...state, status };
    }

    const load = (action: EntityActions.ILoad, state: StateType) => {
      return setStatus({ LOAD: true }, state);
    }

    const loadSuccess = (action: EntityActions.ILoadSuccess, state: StateType) => {
      const { entity } = action;
      return { ...setStatus({ LOAD_SUCCESS: true }, state), entity };
    }


    const loadError = (action: EntityActions.ILoadError, state: StateType) => {
      return setStatus({ LOAD_ERROR: true }, state);
    }


    return {
      setStatus,
      addRequest,
      load,
      loadSuccess,
      loadError
    }
  }


}


