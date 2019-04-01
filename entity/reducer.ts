import { EntityActions } from './actions';

import { EntityAdapter, EntityState } from '@ngrx/entity';
import { IStateEntity } from './types';



export namespace EntityReducer {
  // import Actions = EntityActions.Actions;



  export function createHandlers(featureAdapter: EntityAdapter<IStateEntity>) {
    return {
      addRequest: addRequest(featureAdapter),
      load: load(featureAdapter),
      loadSuccess: loadSuccess(featureAdapter),
      loadError: loadError(featureAdapter)
    }
  }

  export function addRequest(featureAdapter: EntityAdapter<IStateEntity>) {

    return (action: EntityActions.IRequest, state: EntityState<IStateEntity>): EntityState<IStateEntity> => {
      const { stateId, request } = action;
      const stateEntity: IStateEntity = { stateId, request };

      stateEntity.status = { REQUEST: true };

      return featureAdapter.addOne(stateEntity, state);
    }

  }

  export function load(featureAdapter: EntityAdapter<IStateEntity>) {

    return (action: EntityActions.ILoad, state: EntityState<IStateEntity>) => {
      const { stateId } = action;
      const entityState = state.entities[stateId];
      const status = { ...entityState.status, LOAD: true };

      return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
    }
  }

  export function loadSuccess(featureAdapter: EntityAdapter<IStateEntity>) {

    return (action: EntityActions.ILoadSuccess, state: EntityState<IStateEntity>) => {

      const { stateId, entity } = action;
      const entityState = state.entities[stateId];
      const status = { ...entityState.status, LOAD_SUCCESS: true };

      return featureAdapter.updateOne({ id: stateId, changes: { status, entity } }, state);
    }
  }

  export function loadError(featureAdapter: EntityAdapter<IStateEntity>) {

    return (action: EntityActions.ILoadError, state: EntityState<IStateEntity>) => {
      const { stateId } = action;
      const entityState = state.entities[stateId];
      const status = { ...entityState.status, LOAD_ERROR: true };

      return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
    }
  }
}


