import {ILoad, ILoadError, ILoadSuccess, IRequest} from './actions';

import {EntityAdapter, EntityState} from '@ngrx/entity';
import {EntityStoreTypes} from "@libcomm/store/entity/types";


export namespace EntityReducer {
  // import Actions = EntityActions.Actions;


  import IState = EntityStoreTypes.IState;

  export function addRequest(featureAdapter: EntityAdapter<IState>, action: IRequest, state: EntityState<IState>) {

    const {stateId, request} = action;
    const entity: IState = {stateId, request};

    entity.status = {REQUEST: true};

    return featureAdapter.addOne(entity, state);
  }

  export function load(featureAdapter: EntityAdapter<IState>, action: ILoad, state: EntityState<IState>) {

    const {stateId} = action;
    const entityState = state.entities[stateId];
    const status = {...entityState.status, LOAD: true};

    return featureAdapter.updateOne({id: stateId, changes: {status}}, state);
  }

  export function loadSuccess(featureAdapter: EntityAdapter<IState>, action: ILoadSuccess, state: EntityState<IState>) {

    const {stateId, entity} = action;
    const entityState = state.entities[stateId];
    const status = {...entityState.status, LOAD_SUCCESS: true};

    return featureAdapter.updateOne({id: stateId, changes: {status, entity}}, state);
  }

  export function loadError(featureAdapter: EntityAdapter<IState>, action: ILoadError, state: EntityState<IState>) {

    const {stateId} = action;
    const entityState = state.entities[stateId];
    const status = {...entityState.status, LOAD_ERROR: true};

    return featureAdapter.updateOne({id: stateId, changes: {status}}, state);
  }
}


