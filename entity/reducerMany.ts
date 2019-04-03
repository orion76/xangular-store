import { EntityAdapter, EntityState } from '@ngrx/entity';
import * as Immutable from 'immutable';
import { EntityActions } from './actionsMany';
import { IStateRecord, StateRecord, TEntityStatusList, TStatus } from './types';


// type IStateEntity = Pick<IStateEntity, keyof IStateEntity>;
// type IEntityStatus = Partial<IEntityStatus>;

export namespace EntityReducer {
  // import Actions = EntityActions.Actions;
  export type StateRecord = Immutable.RecordOf<IStateRecord>;

  export function factoryHandlers(featureAdapter: EntityAdapter<StateRecord>) {


    const setStatus = (statusNew: TStatus<TEntityStatusList>, statusOld: TStatus<TEntityStatusList>): TStatus<TEntityStatusList> => {
      return { ...(statusOld as any), statusNew };
    }


    const add = (action: EntityActions.IAdd, state: EntityState<StateRecord>): EntityState<StateRecord> => {
      const { stateId, request } = action;
      const stateNew: StateRecord = new StateRecord({ stateId, data: { request }, status: { REQUEST: true } });
      return featureAdapter.addOne(stateNew, state);
    }



    const load = (action: EntityActions.ILoad, state: EntityState<StateRecord>): EntityState<StateRecord> => {
      const { stateId } = action;
      const entityState: StateRecord = state.entities[stateId];
      const status = setStatus({ LOAD: true }, entityState.status);
      return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
    }


    const loadSuccess = (action: EntityActions.ILoadSuccess, state: EntityState<StateRecord>): EntityState<StateRecord> => {

      const { stateId, entity } = action;
      const entityState = state.entities[stateId];
      const status = setStatus({ LOAD_SUCCESS: true }, entityState.status);

      return featureAdapter.updateOne({ id: stateId, changes: { status, entity } }, state);
    }


    const loadError = (action: EntityActions.ILoadError, state: EntityState<StateRecord>): EntityState<StateRecord> => {
      const { stateId } = action;
      const entityState = state.entities[stateId];
      const status = setStatus({ LOAD_ERROR: true }, entityState.status);

      return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
    }
    return {
      add,
      load,
      loadSuccess,
      loadError
    }
  }


}


