import { EntityAdapter, EntityState } from '@ngrx/entity';
import { EntityActions } from './actionsMany';
import { IStateEntity, IEntityStatus } from './types';



// type IStateEntity = Pick<IStateEntity, keyof IStateEntity>;
// type IEntityStatus = Partial<IEntityStatus>;

export namespace EntityReducer {
  // import Actions = EntityActions.Actions;

  export function factoryHandlers<StateEntity extends IStateEntity, StatusEntity extends IEntityStatus>(featureAdapter: EntityAdapter<StateEntity>) {


    const setStatus = (statusNew: StatusEntity, statusOld: StatusEntity): StatusEntity => {
      return { ...(statusOld as any), statusNew };
    }


    const addRequest = (action: EntityActions.IRequest, state: EntityState<StateEntity>): EntityState<StateEntity> => {
      const { stateId, request } = action;
      const stateEntity = {
        stateId,
        data: { request },
        counts: {},
        status: setStatus({ REQUEST: true }, {})
      };
      return featureAdapter.addOne(stateEntity, state);
    }



    const load = (action: EntityActions.ILoad, state: EntityState<StateEntity>): EntityState<StateEntity> => {
      const { stateId } = action;
      const entityState: StateEntity = state.entities[stateId];
      const status = setStatus({ LOAD: true }, entityState.status);
      return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
    }


    const loadSuccess = (action: EntityActions.ILoadSuccess, state: EntityState<StateEntity>): EntityState<StateEntity> => {

      const { stateId, entity } = action;
      const entityState = state.entities[stateId];
      const status = setStatus({ LOAD_SUCCESS: true }, entityState.status);

      return featureAdapter.updateOne({ id: stateId, changes: { status, entity } }, state);
    }


    const loadError = (action: EntityActions.ILoadError, state: EntityState<StateEntity>): EntityState<StateEntity> => {
      const { stateId } = action;
      const entityState = state.entities[stateId];
      const status = setStatus({ LOAD_ERROR: true }, entityState.status);

      return featureAdapter.updateOne({ id: stateId, changes: { status } }, state);
    }
    return {
      addRequest,
      load,
      loadSuccess,
      loadError
    }
  }


}


