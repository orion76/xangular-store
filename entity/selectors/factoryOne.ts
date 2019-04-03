import { createSelector, MemoizedSelector } from '@ngrx/store';
import { xselect } from '../../rxjs-operators/select';
import { IStateEntity, IStateProps, IStatusProps, TEntityStatus, TStatus, IStateRecord } from '../types';





export namespace EntitySelectorsOne {

  export function create<AppState, StateRecord extends IStateRecord, StatusList extends string>(feature: MemoizedSelector<AppState, StateRecord>) {

    const selectors = getSelectors<AppState, StateRecord>(feature);

    return {
      entityState: (props: IStateProps) => xselect(selectors.entity, props),
      entity: (props: IStateProps) => xselect(selectors.entity, props),
      data: (props: IStateProps) => xselect(selectors.data, props),
      status: (props: IStateProps) => xselect(selectors.status, props),
      counts: (props: IStateProps) => xselect(selectors.counts, props),
      isStatus: (status: TStatus<StatusList>) => xselect(selectors.isStatus, { status }),
      notStatus: (status: TEntityStatus) => xselect(selectors.notStatus, { status }),
    }
  }
}



function getSelectors<AppState, StateRecord extends IStateRecord>(entity: MemoizedSelector<AppState, StateRecord>) {
  const data = createSelector(entity, ((entity: StateRecord) => entity.data));
  const status = createSelector(entity, ((entity: StateRecord) => entity.status));
  const counts = createSelector(entity, ((entity: StateRecord) => entity.counts));

  const isStatus = createSelector(entity, ((entity: StateRecord, props: IStatusProps) => {
    return Object.keys(props.status).every((status: string) => entity.status[status] === props[status]) ? entity : null;
  }));
  const notStatus = createSelector(entity, ((entity: StateRecord, props: IStatusProps) => {
    return Object.keys(props.status).every((status: string) => entity.status[status] !== props[status]) ? entity : null;
  }));

  return { entity, data, status, counts, isStatus, notStatus };
}
